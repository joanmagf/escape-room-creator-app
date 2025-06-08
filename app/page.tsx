"use client";

import Link from "next/link";
import {
  FaGamepad,
  FaGraduationCap,
  FaUsers,
  FaVrCardboard,
} from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-800 text-white">
      {/* Navegació */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Escape Room Creator</div>
        <div className="space-x-4">
          <Link href="/login" className="hover:text-blue-300 transition">
            Iniciar sessió
          </Link>
          <Link
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
            Registrar-se
          </Link>
        </div>
      </nav>

      {/* Secció principal */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dissenya i Construeix Experiències 3D d'Escape Room
            </h1>
            <p className="text-xl mb-8 text-blue-200">
              Una plataforma per a professors que vulguin crear experiències
              educatives immersives per als seus alumnes. Crea, comparteix i
              juga escape rooms 3D directament al navegador.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/templates"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition flex items-center"
              >
                <FaGamepad className="mr-2" />
                Comença a crear
              </Link>
              <Link
                href="/rooms"
                className="bg-transparent border-2 border-blue-400 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg font-semibold transition flex items-center"
              >
                <FaVrCardboard className="mr-2" />
                Prova la demo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="w-full h-96 bg-blue-700 rounded-lg shadow-xl flex items-center justify-center">
              <div className="text-center">
                <FaVrCardboard className="text-6xl mx-auto mb-4" />
                <p className="text-xl">Visualització 3D interactiva</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Secció de característiques */}
      <section className="bg-blue-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Característiques principals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <FaVrCardboard />
              </div>
              <h3 className="text-xl font-bold mb-2">Entorns 3D immersiu</h3>
              <p>
                Crea sales d'escape amb entorns 3D completament navegables
                utilitzant A-Frame, accessible des de qualsevol navegador.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <FaGamepad />
              </div>
              <h3 className="text-xl font-bold mb-2">Enigmes personalitzats</h3>
              <p>
                Dissenya preguntes, pistes i desafiaments relacionats amb el
                contingut educatiu que vulguis reforçar amb els teus alumnes.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-bold mb-2">Enfocament educatiu</h3>
              <p>
                Integra els continguts del teu currículum en activitats lúdiques
                i engrescadores per augmentar la motivació dels estudiants.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-2">Col·laboració en equip</h3>
              <p>
                Permet que els alumnes treballin junts per resoldre els
                desafiaments, fomentant les habilitats de comunicació i treball
                en equip.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Biblioteca d'objectes</h3>
              <p>
                Accedeix a una àmplia col·lecció d'objectes 3D interactius que
                pots utilitzar per donar vida a les teves sales d'escape.
              </p>
            </div>

            <div className="bg-blue-700 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-3xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Interfície intuïtiva</h3>
              <p>
                Utilitza un editor visual senzill que no requereix coneixements
                de programació, permetent-te centrar-te en el contingut
                educatiu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secció de casos d'ús */}
      <section className="py-16 bg-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Com utilitzar-lo a l'aula
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-indigo-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Per a professors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Crea escape rooms per reforçar conceptes clau del currículum
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Avalua el progrés dels alumnes a través d'informes detallats
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Fomenta l'aprenentatge actiu i la resolució de problemes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Personalitza els continguts per adaptar-los a diferents
                    nivells
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Per a alumnes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>Aprèn de manera lúdica i immersiva</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Desenvolupa habilitats de pensament crític i treball en
                    equip
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Participa en activitats motivadores que reforcen els
                    continguts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>
                    Accedeix a l'experiència des de qualsevol dispositiu amb
                    navegador
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Secció de crida a l'acció */}
      <section className="py-16 bg-gradient-to-b from-indigo-800 to-blue-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Preparat per revolucionar la teva aula?
          </h2>
          <p className="text-xl mb-8 text-blue-200 max-w-3xl mx-auto">
            Uneix-te a la comunitat d'educadors que estan transformant
            l'experiència d'aprenentatge amb escape rooms 3D interactius i
            educatius.
          </p>
          <Link
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition inline-flex items-center"
          >
            Crea el teu compte gratuït
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-blue-400">
                &copy; 2025 Escape Room Creator. Tots els drets reservats.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/about"
                className="text-blue-400 hover:text-white transition"
              >
                Sobre nosaltres
              </Link>
              <Link
                href="/contact"
                className="text-blue-400 hover:text-white transition"
              >
                Contacte
              </Link>
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-white transition"
              >
                Privacitat
              </Link>
              <Link
                href="/terms"
                className="text-blue-400 hover:text-white transition"
              >
                Termes d'ús
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
