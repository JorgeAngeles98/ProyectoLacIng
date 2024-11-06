
function HomePage() {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="bg-emerald-600 w-full py-6">
        <img
          className="w-full h-auto"
          src="https://media.discordapp.net/attachments/958156136991834158/1303514360186146906/image4.png?ex=672c07d9&is=672ab659&hm=f64e14a6baa8f4323d289441d8818edf07708a3cd5bdb7a4643025014b1e74a2&=&format=webp&quality=lossless&width=1440&height=438"
          alt="Banner"
        />
        <h1 className="text-white my-2 text-3xl text-center">Welcome to Our Landing Page</h1>
      </header>
      <main className="flex-1 w-full px-4 py-8">
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700">
            We are a company dedicated to providing the best services to our customers. Our team is
            committed to excellence and innovation.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Service 1: Description of service 1.</li>
            <li>Service 2: Description of service 2.</li>
            <li>Service 3: Description of service 3.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Contact Us</h2>
          <form className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded"
                id="message"
                name="message"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </section>
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Student Table</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-gray-700 py-2 px-4 border-b">AID</th>
                <th className="text-gray-700 py-2 px-4 border-b">Alumno</th>
                <th className="text-gray-700 py-2 px-4 border-b">Edad</th>
                <th className="text-gray-700 py-2 px-4 border-b">Código</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-700 py-2 px-4 border-b">1</td>
                <td className="text-gray-700 py-2 px-4 border-b">Juan Perez</td>
                <td className="text-gray-700 py-2 px-4 border-b">20</td>
                <td className="text-gray-700 py-2 px-4 border-b">A001</td>
              </tr>
              <tr>
                <td className="text-gray-700 py-2 px-4 border-b">2</td>
                <td className="text-gray-700 py-2 px-4 border-b">Maria Lopez</td>
                <td className="text-gray-700 py-2 px-4 border-b">22</td>
                <td className="text-gray-700 py-2 px-4 border-b">A002</td>
              </tr>
              <tr>
                <td className="text-gray-700 py-2 px-4 border-b">3</td>
                <td className="text-gray-700 py-2 px-4 border-b">Carlos Sanchez</td>
                <td className="text-gray-700 py-2 px-4 border-b">21</td>
                <td className="text-gray-700 py-2 px-4 border-b">A003</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <footer className="bg-emerald-700 w-full py-4">
        <p className="text-white text-center">&copy; 2024 Our Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage;