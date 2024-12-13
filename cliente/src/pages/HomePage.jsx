
function HomePage() {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="bg-emerald-600 w-full py-6">
      
        <h1 className="text-white my-2 text-5xl text-center">BIENVENIDOS A LABICING</h1>
      </header>
      <main className="flex-1 w-full px-4 py-8">
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Servicios</h2>
          <div className="text-gray-950">
            <h3>MISIÓN: </h3>
            <p>Atender de manera eficiente y proporcionando un servicio de calidad para el desarrollo académico, y todos los medios necesarios para la investigación de la Ingeniería y para la formación de profesionales de la misma especialidad.</p>
            <h3>VISIÓN:</h3>
            <p>Convertirnos en la principal instalación de la Facultad de Ingeniería, equipada convenientemente con hardware y software, en donde podrán reunirse profesores y alumnos para la generación de nueva ciencias y tecnología, así como para la formación de profesionales de las escuelas de Ingeniería y la correspondiente transmisión de conocimientos.</p>
          </div>
          
        </section>
        <section className="mb-8">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">HORAS LIBRES</h2>
          <ul className="list-disc list-inside text-gray-700">
          
            <li>AFORO: 20 CAPACIDAD MAXIMA POR SALON </li>
          </ul>
    
        </section>
        <section className="mb-8">
          <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Salones:</h2>
        
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-201A
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-201B
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-202A
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-202B
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-203
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-210
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-211
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-213A
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-213B
            </button>
            <button
              className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded mr-5 ml-5"
              type="submit"
            >
              G-214
            </button>
           
          </div>
        </section>
        

        <section className="mb-8">
          <h2 className="text-gray-700 text-5xl text-center">BLOG</h2>
          <table className="min-w-full bg-white">
            <thead>
            
            <div className="flex justify-center space-x-4">
          <img src="https://cdn.discordapp.com/attachments/958156136991834158/1313273558142554203/Captura_wifi.png?ex=6755778f&is=6754260f&hm=da4308a4d8ab510c35b69fcca388b99c668b6b66e89afae9f1ecbeb66a2d0907&" alt="Imagen 1" className="w-30 h-25 object-cover rounded-1g shadow-1g" />
          <img src="https://cdn.discordapp.com/attachments/958156136991834158/1313273582427705435/Captura_anexos.png?ex=67557795&is=67542615&hm=d2f9bd2e0094090326f951e350b7434aff60b9e5e18ab90be16e74d36eee40d1&" alt="Imagen 2" className="w-30 h-50 object-cover rounded-lg shadow-lg" />
          
         </div>
        <div className="flex justify-center space-x-4">
         <img src="https://cdn.discordapp.com/attachments/958156136991834158/1315013567845629962/Reglamento1.jpg?ex=6755dd52&is=67548bd2&hm=0d9998fdd4f6a03ce279c0d966910af191dd98d59e39bcb338fb6b1f5551df79&" alt="Imagen 3" className="w-30 h-50 object-cover rounded-lg shadow-lg" />
          <img src="https://cdn.discordapp.com/attachments/958156136991834158/1315013567501570048/Reglamento2.jpg?ex=6755dd52&is=67548bd2&hm=1866803e89920bf8093eadd0eed6e79bd802af01bd828e76f934f7db12569c6f&" alt="Imagen 4" className="w-30 h-50 object-cover rounded-lg shadow-lg" />
        </div>

              
            </thead>
            
          </table>
        </section>


      </main>
      <footer className="bg-emerald-700 w-full py-4">
        <p className="text-white text-center">&copy; 2024 LABICING</p>
      </footer>
    </div>
  )
}

export default HomePage;