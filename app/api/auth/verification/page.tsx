export default function VerificationPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 shadow-md rounded-xl">
        <div className="flex flex-col w-96 justify-center">
          <p>
            A verification link was sent to your{' '}
            <span className="underline">email.</span> Please verify your
            account.
          </p>
        </div>
      </div>
    </div>
  );
}
