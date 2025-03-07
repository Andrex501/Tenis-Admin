<template>
    <div>

<form @submit.prevent="subirProducto" class="form">
    <p class="title">KENI SNEAKERS</p>
    <p class="message">TENIS</p>
 
    <label>
        <input v-model="nombre" class="input" type="text" required>
        <span>Nombre</span>
    </label> 

    <label>
        <input v-model="precio" class="input" type="number" required>
        <span>Precio</span>
    </label> 
        
    <label>
        <input v-model="stock" class="input" type="number" required>
        <span>Stock</span>
    </label>
    
    <label>
        <input @change="cargarImagen" class="input" type="file" required>
        
    </label>
    <button type="submit" class="submit">Submit</button>
    
</form>


    </div>
</template>


<style>

body {
  margin: 0; /* Elimina el margen predeterminado del body */
  height: 100vh; /* Asegura que el body ocupe toda la altura de la ventana */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  background-color: #121212; /* Un fondo oscuro, opcional */
  font-family: sans-serif; /* Fuente predeterminada, opcional */
}




/* From Uiverse.io by ammarsaa */ 
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
}

.title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: #00bfff;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #00bfff;
}

.message, 
.signin {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
}

.signin {
  text-align: center;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.signin a {
  color: #00bfff;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 12.5px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  color: #00bfff;
  top: 0px;
  font-size: 0.7em;
  font-weight: 600;
}

.input {
  font-size: medium;
}

.submit {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
  background-color: #00bfff;
}

.submit:hover {
  background-color: #00bfff96;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

</style>


<script setup>
import { ref } from "vue";

const nombre = ref('');
const precio = ref('');
const stock = ref('');
const imagen = ref(null);

const cargarImagen = (event) => {
  imagen.value = event.target.files[0];
};

const subirProducto = async () => {
  const formData = new FormData();
  formData.append("nombre", nombre.value);
  formData.append("precio", precio.value);
  formData.append("stock", stock.value);
  formData.append("imagen", imagen.value);

  try {
    const respuesta = await fetch("http://localhost:5001/productos", {
      method: "POST",
      body: formData,
    });

    if (respuesta.ok) {
      const datos = await respuesta.json();
      console.log("Producto guardado:", datos);
      alert("Producto enviado correctamente");

      // Limpiar los campos después del envío
      nombre.value = '';
      precio.value = '';
      stock.value = '';
      imagen.value = null;
    } else {
      alert("Error al enviar el producto");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema con el envío");
  }
};
</script>


