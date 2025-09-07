import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-white overflow-x-hidden">
      
      <section className="py-16">
        <h2 className="text-2xl font-semibold text-center mb-3">Ações Rápidas</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <button 
            onClick={() => navigate('/clientes')}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold">Cadastro de Pets</h3>
              <p className="text-gray-600">Adicione e gerencie os pets cadastrados.</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/usuarios')}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className="p-3 text-center">
              <h3 className="text-lg font-bold">Usuários</h3>
              <p className="text-gray-600">Gerencie os usuários cadastrados em seu sistema.</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/fotos')}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold">Fotos</h3>
              <p className="text-gray-600">Visualize as fotos dos pets.</p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
