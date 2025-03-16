import { createRouter, createWebHistory } from 'vue-router';
import Formulario from './components/Formulario.vue'; // Asegúrate de que la ruta sea correcta
const routes = [
  {
    path: '/', // Página principal (puedes cambiar esto si es necesario)
    name: 'Formulario',
    component: Formulario, // Componente de inicio, si lo tienes
  },
];

const router = createRouter({
  history: createWebHistory(), // Sin base_url si no usas un subdirectorio
  routes,
});

export default router;

