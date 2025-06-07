//create register page

export default function Register() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Register</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
          <input type="text" placeholder="Phone" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
