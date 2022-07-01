const expres = require('express')
const cors = require('cors')
const app = expres()
const logger = require('./loggerMiddleware')
const { json } = require('express')

app.use(cors())
app.use(expres.json())
app.use(logger)

let Persona = [
  {
    id: 1,
    Nombre: 'Nestor Arcangel',
    Apellido: 'Maldonado',
    DNI: 44607663,
    Empleado: true
  },
  {
    id: 2,
    Nombre: 'Matias',
    Apellido: 'Macario',
    DNI: 43227926,
    Empleado: false
  },
  {
    id: 3,
    Nombre: 'Tomas',
    Apellido: 'Sabena',
    DNI: 42749457,
    Empleado: false
  },
  {
    id: 4,
    Nombre: 'Tomas',
    Apellido: 'Gottero',
    DNI: 40801330,
    Empleado: true
  }
]

app.get('/', (request, response) => {
  response.send(`<h1>Bienvenidos<h1><br><p>Usa /api/personas para ver las tablas de <a href="http://localhost:${PORT}/api/personas">personas</a>.</p>`)
})

app.get('/api/personas', (request, response) => {
  response.json(Persona)
})

app.get('/api/personas/:id', (request, response) => {
  const id = Number(request.params.id)
  const Personas = Persona.find(Personas => Personas.id == id)
  if (Personas) {
    response.json(Personas)
  } else {
    response.status(404).end()
  }
})

app.put('/api/personas/:id', (request, response) => {
  const id = Number(request.params.id)
  const body = request.body
  Persona.filter(Persona => {
    if (Persona.id == id) {
      Persona.Nombre = body.Nombre
      Persona.Apellido = body.Apellido
      Persona.DNI = body.DNI
      Persona.Empleado = body.Empleado
    }
  })
  response.send(Persona)
})

app.delete('/api/personas/:id', (request, response) => {
  const id = Number(request.params.id)
  Persona = Persona.filter(Personas => Personas.id !== id)
  response.status(204).end()
})

app.post('/api/personas', (request, response) => {
  const Personas = request.body

  if (!Personas.Nombre || !Personas.Apellido || !Personas.DNI) {
    return response.status(204).json({
      error: 'posibles errores: La clase Persona le falta el dato de Nombre; La clase Persona le falta el datos de Apellido; La clase Persona le falta el dato de DNI '
    })
  }

  const ids = Persona.map(Persona => Persona.id)
  const maxid = Math.max(...ids)

  const altaPersona = {
    id: maxid + 1,
    Nombre: Personas.Nombre,
    Apellido: Personas.Apellido,
    DNI: Personas.DNI,
    Empleado: typeof Personas.Empleado !== 'undefinded' ? Personas.Empleado : false
  }

  Persona = Persona.concat(altaPersona)

  response.status(201).json(altaPersona)
})

app.use((request, response, next) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server esta corriendo en el puerto ${PORT}`)
})
