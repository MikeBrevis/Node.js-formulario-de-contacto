# Contact Form with Email Integration

Este proyecto es un formulario de contacto con validación de datos y envío de emails usando Node.js.

## Instalación

1. Clona el repositorio
2. Navega a la carpeta `contact-form-test`
3. Instala las dependencias:
```bash
npm install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la carpeta `contact-form-test` con las siguientes variables:

```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-app
CONTACT_EMAIL=donde-recibir-emails@ejemplo.com
PORT=3000
```

### Configuración de Gmail (Recomendado)

Si usas Gmail:

1. **Habilita la Autenticación de dos factores** en tu cuenta de Google
2. **Genera una contraseña de aplicación**:
   - Ve a [Google Account Security](https://myaccount.google.com/security)
   - En "Contraseñas de aplicaciones", selecciona "Mail" y "Windows Computer"
   - Google te proporcionará una contraseña de 16 caracteres
3. **Usa esa contraseña** en `EMAIL_PASSWORD` del archivo `.env`

**Importante**: Nunca uses tu contraseña normal de Gmail. Google no permite el acceso si tienes autenticación de dos factores sin usar contraseñas de aplicación.

### Otros proveedores de correo

Si no usas Gmail, puedes cambiar el servicio en `serve.js`:

```javascript
const transporter = nodemailer.createTransport({
    service: 'outlook', // o 'yahoo', 'aol', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

## Uso

1. Inicia el servidor:
```bash
npm start
```
o con nodemon para desarrollo:
```bash
npx nodemon serve.js
```

2. Abre tu navegador en `http://localhost:3000`

3. Completa el formulario de contacto

## Validaciones

### Frontend (app.js)
- Nombre: Mínimo 3 caracteres, solo letras y espacios
- Email: Formato de email válido
- Asunto: Mínimo 3 caracteres, máximo 100
- Mensaje: Mínimo 10 caracteres, máximo 5000

### Backend (serve.js)
Las mismas validaciones se aplican en el servidor por seguridad.

## Estructura del Proyecto

```
Node.js-formulario-de-contacto/
├── public/
│   ├── app.js (Validación frontend)
│   ├── contactform.html
│   └── style.css
├── contact-form-test/
│   ├── serve.js (Backend y envío de emails)
│   ├── package.json
│   └── .env (Configuración de variables)
├── .gitignore
└── README.md
```

## Dependencias

- **express**: Framework web para Node.js
- **nodemailer**: Librería para enviar emails
- **dotenv**: Cargar variables de entorno desde archivo .env
- **deep-email-validator**: Validador avanzado de emails (opcional)

## Troubleshooting

### Error: "Bad credentials"
- Verifica que estés usando una contraseña de aplicación (para Gmail)
- Revisa que `EMAIL_USER` sea el email correcto

### Error: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### El servidor no inicia
- Verifica que el puerto 3000 esté disponible
- O cambia `PORT` en el archivo `.env`

## Contribuir

¡Contribuciones bienvenidas! Por favor abre un issue o pull request.
