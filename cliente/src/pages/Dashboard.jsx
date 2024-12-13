function Dashboard() {
  return (
    <div>

      <section className="mb-8">
       <h1 className="text-4xl font-bold text-center text-emerald-500 mt-14 " >¡Bienvenido Usuario!</h1>
            <div className="flex justify-between mx-48 mt-14">
              <h1 className="text-2xl text-black w-60 h-30 rounded-lg"> • Calendario 2024 - II</h1>
              <h1 className="text-2xl text-black w-80 h-30 rounded-lg"> • Calendario 2025 - 0</h1>
            </div>

        <div className="flex justify-center space-x-2 mt-8 ">
         <img src="https://www.urp.edu.pe/img/thumbnails/zc/4/src/56482/n/calendario-academico-2024-ii.png" alt="Imagen 1" className="px-2 object-cover rounded-lg shadow-lg"/>
         <img src="https://www.urp.edu.pe/img/thumbnails/zc/4/src/59393/n/calendario-academico-2025-0.png" alt="Imagen 2" className="px-12 object-cover rounded-lg shadow-lg"/>
        </div>
      </section>

      <main className="flex-1 w-full px-10 py-10"></main>
      
      <section className="mb-2"></section>
      
      <div className="flex justify-center mx-10 mt-2">
       <a href="verificar-curso">  
        <button className="text-3xl text-white text-center bg-emerald-800 hover:bg-slate-600 px-6 py-3 rounded-lg shadow-lg mr-10 ml-10 ">Verificar Curso</button>
       </a>
      </div>

      <section className="mb-16">
       <div className="flex justify-end mx-24 mt-20">
        <h2 className="text-2xl text-amber-500 text-center w-80 h-1 mb-10"> Directorio Telefónico de las Oficinas de Lab:</h2>
       </div>

       <div className="container flex flex-col justify-center items-start mx-56 mt-2 mb-8"> 
        <ul className="space-y-2">
          <li className="text-2xl text-center text-black"> • Próximos Exámenes: Exámenes Parciales 2025-I</li>
          <li className="text-2xl text-center text-emerald-700">Semana 08: Del ... al .... de Mayo</li>
        </ul>
       </div>  
       
       <div className="container flex flex-col justify-end items-end -mx-44 mt-8 mb-8"> 
        <ul className="space-y-10">
          <li className="text-xl text-center text-black"> • Anexo Oficina 201: 1234</li>
          <li className="text-xl text-center text-black"> • Anexo Oficina 202: 4567</li>
          <li className="text-xl text-center text-black"> • Anexo Oficina 213: 7890</li>
        </ul>
       </div> 

       <div className="flex justify-center space-x-1 mt-44">
          <img src="https://www.urp.edu.pe/img/thumbnails/wm/1000/hm/500/we/1767/he/500/x/-384/y/0/s/0/q/60/zc/3/f/0/rgb/000000/src/628/n/banner-ing.ok.jpg" alt="Imagen 3" className="w-full h-56 object-cover rounded-lg shadow-lg"/>
       </div>

        <footer className="bg-emerald-700 w-full py-4">
         <p className="text-white text-center">&copy; URP  Av. Alfredo Benavides - Surco   Tlf. (01) 7080000</p>
         <p className="text-white text-center">&copy; 2024 - Perú</p>
        </footer>
      </section>

      {/* <footer className="bg-emerald-700 w-full py-4">
        <p className="text-white text-center">&copy; URP  Av. Alfredo Benavides - Surco   Tlf.(01) 7080000</p>
        <p className="text-white text-center">&copy; 2024  - Perú</p>
      </footer> */}
      
    </div>
  );
}

export default Dashboard;