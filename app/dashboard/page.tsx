import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';

import { notFound } from 'next/navigation';
import StatusDropdown from './status-dropdown';
import { createClient } from '@/utils/supabase/server';

export enum OrderStatus {
  AWAITING_SHIPMENT = 'awaiting_shipment',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
}

interface Order {
  id: string;
  status: OrderStatus;
  shippingaddress?: {
    name: string;
  };
  user: {
    email: string;
  };
  createdat: Date;
  amount: number;
}

const Page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You need to be logged in');
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  const { data: orders, error: ordersError } = await supabase
    .from('Order')
    .select(
      `
    *,
    user:profiles(*),
    shippingaddress:shippingaddress(*)
  `
    )
    .eq('ispaid', true)
    .gte(
      'createdat',
      new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
    )
    .order('createdat', { ascending: false });

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
    throw ordersError;
  }

  const { data: lastWeekSum, error: lastWeekSumError } = await supabase
    .from('Order')
    .select('amount', { count: 'exact' })
    .eq('ispaid', true)
    .gte(
      'createdat',
      new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
    )
    .single();

  if (lastWeekSumError) {
    if (lastWeekSumError.code === 'PGRST116') {
      // No orders found within the last week
      console.log('no orders');
    } else {
      console.error('Error calculating last week sum:', lastWeekSumError);
      throw lastWeekSumError;
    }
  }

  const { data: lastMonthSum, error: lastMonthSumError } = await supabase
    .from('Order')
    .select('amount', { count: 'exact' })
    .eq('ispaid', true)
    .gte(
      'createdat',
      new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
    )
    .single();

  if (lastMonthSumError) {
    if (lastMonthSumError.code === 'PGRST116') {
      // No orders found within the last month
      console.log('no orders');
    } else {
      console.error('Error calculating last month sum:', lastMonthSumError);
      throw lastMonthSumError;
    }
  }

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum?.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum?.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum?.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum?.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order: Order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingaddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown
                      id={order.id}
                      orderStatus={order.status as OrderStatus}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.createdat.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
