# HackItba 2023

### COMPETICIÓN PRESENCIAL ENTRE EL 31/3 Y EL 2/4 DE 2023

### Integrantes:
* Mutz Matias
* Neme Emilio
* Ves Losada Tobias

### **Resumen**:

Este programa hace un calculo para poder predecir el stock en un determinado tiempo y con esto evitar que se stockee de mas y que el negocio se quede sin stock. A su vez, ofrece un marketplace de proveedores donde por cada producto estan los distintos proveedores con su precio y con sus condiciones de venta.

### **Pasos a seguir**:

Entrar a https://hackitba-null.vercel.app/
Alli se obtiene la pagina deployada con toda su funcionalidad.

### **Detalles de funcionamiento**:

La pagina de login no registra usuarios asi que con solo tocar "sign in" ya se tiene acceso al index de la pagina.

La pagina principal contiene al dashboard con informacion general. Por la parte de arriba vemos la cantidad de ventas totales por meses de los ultimos meses. En la zona inferior muestra las ultimas ventas.

En la zona izquierda tenemos un arbol en donde hay varias zonas. El panel de productos contiene una tabla con los productos del cliente. Cada producto tiene su identificador, el stock que queda del mismo y una columna mas que indica en cuantos dias se acabaria el stock actual. La tabla por defecto esta ordenada de tal manera que queden mas arriba los productos mas proximos a quedarse sin stock. Los productos a los que se le debe tener mayor precaución tienen el numero de la columna de dias a quedarse sin stock de color anaranjado.
El boton 'ADD PRODUCT' permite añadir un nuevo producto con su nombre, la descripcion y el stock. Al seleccionar algun producto con el boton del tacho de basura se puede eliminar el mismo.
Al seleccionar alguno de los productos hay dos opciones. Una esta asociada al boton 'ADD PROVIDER' que indica que los productos seleccionados tendrán asociados los proveedores indicados. Luego con el boton 'ASK FOR BUDGET' lo que hace es enviar un mail generado con inteligencia artificial pidiendo la cotizacion de los productos seleccionados por la cantidad de stock que se indique.

Luego en la pestaña de providers tenemos la funcionalidad de agregado y eliminado de registros como en productos. El boton de 'ADD PRODUCT' permite asociar uno o mas proveedores con el producto que se indique.

Tanto desde el boton de arriba que dice 'Go to MarketPlace' como desde la pestaña de la izquierda que dice Providers MarketPlace nos lleva al marketplace de proveedores en donde estan ubicados los distintos productos que ofrecen los proveedores. A futuro, esto va a tener features de poder buscar por productos y filtrar por los parametros que al cliente le parezcan interesantes. Cada una de las tarjetas obtiene la información del producto. Otra feature es quen


       



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

This site is also deplyed in Vercel. [Click Here](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
