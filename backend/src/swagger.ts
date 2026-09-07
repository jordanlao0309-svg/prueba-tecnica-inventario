export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión de Inventario de Equipos TI',
    version: '1.0.0',
    description:
      'Documentación interactiva de la API REST para el control y administración de inventario de equipos de cómputo (SENATI / IIAP). Desarrollado con Node.js, Express, TypeScript y Prisma ORM sobre PostgreSQL.',
    contact: {
      name: 'Área de TI / Practicante Preprofesional',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desarrollo Local',
    },
  ],
  tags: [
    {
      name: 'Equipos',
      description: 'Operaciones CRUD para la gestión de inventario de equipos',
    },
  ],
  paths: {
    '/api/equipos': {
      get: {
        tags: ['Equipos'],
        summary: 'Listar todos los equipos registrados',
        description: 'Retorna la lista completa de equipos de cómputo ordenados del más reciente al más antiguo.',
        responses: {
          '200': {
            description: 'Lista de equipos obtenida exitosamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Equipo',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Equipos'],
        summary: 'Crear un nuevo equipo',
        description: 'Registra un nuevo equipo en el inventario. Los campos nombre, marca y numeroSerie son obligatorios.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateEquipoInput',
              },
              example: {
                nombre: 'Laptop ThinkPad T14 Gen 3',
                marca: 'Lenovo',
                estado: 'OPERATIVO',
                numeroSerie: 'LNV-2024-8841',
                descripcion: 'Laptop asignada al área de desarrollo (16GB RAM, 512GB SSD)',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Equipo creado exitosamente.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Equipo',
                },
              },
            },
          },
          '400': {
            description: 'Faltan campos obligatorios en la petición.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'Los campos nombre, marca y numeroSerie son obligatorios',
                },
              },
            },
          },
          '409': {
            description: 'Conflicto: Ya existe un equipo con ese número de serie.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'Ya existe un equipo con ese número de serie',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/equipos/{id}': {
      get: {
        tags: ['Equipos'],
        summary: 'Obtener un equipo por su ID',
        description: 'Retorna los detalles de un equipo específico identificado por su ID numérico.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID numérico del equipo',
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Detalle del equipo encontrado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Equipo',
                },
              },
            },
          },
          '400': {
            description: 'El ID proporcionado no es un número válido.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Equipo no encontrado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'Equipo no encontrado',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Equipos'],
        summary: 'Actualizar la información de un equipo',
        description: 'Actualiza los campos de un equipo existente. Puede actualizarse parcialmente.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID numérico del equipo a actualizar',
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateEquipoInput',
              },
              example: {
                estado: 'EN_MANTENIMIENTO',
                descripcion: 'Enviada a cambio de pasta térmica y limpieza de ventiladores',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Equipo actualizado exitosamente.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Equipo',
                },
              },
            },
          },
          '400': {
            description: 'ID inválido o datos incorrectos.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'El equipo a actualizar no existe.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'El equipo a actualizar no existe',
                },
              },
            },
          },
          '409': {
            description: 'Ya existe otro equipo con el nuevo número de serie ingresado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Equipos'],
        summary: 'Eliminar un equipo del inventario',
        description: 'Elimina permanentemente un equipo del sistema según su ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID numérico del equipo a eliminar',
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          '204': {
            description: 'Equipo eliminado exitosamente (Sin contenido).',
          },
          '400': {
            description: 'ID proporcionado inválido.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'El equipo a eliminar no existe.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'El equipo a eliminar no existe',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      EstadoEquipo: {
        type: 'string',
        enum: ['OPERATIVO', 'EN_MANTENIMIENTO', 'DADO_DE_BAJA'],
        example: 'OPERATIVO',
      },
      Equipo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          nombre: {
            type: 'string',
            example: 'Laptop ThinkPad T14 Gen 3',
          },
          marca: {
            type: 'string',
            example: 'Lenovo',
          },
          estado: {
            $ref: '#/components/schemas/EstadoEquipo',
          },
          numeroSerie: {
            type: 'string',
            example: 'LNV-2024-8841',
          },
          descripcion: {
            type: 'string',
            nullable: true,
            example: 'Equipo asignado al área de TI',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-17T18:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-17T18:30:00.000Z',
          },
        },
      },
      CreateEquipoInput: {
        type: 'object',
        required: ['nombre', 'marca', 'numeroSerie'],
        properties: {
          nombre: {
            type: 'string',
            example: 'Monitor UltraSharp 27 pulgadas',
          },
          marca: {
            type: 'string',
            example: 'Dell',
          },
          estado: {
            $ref: '#/components/schemas/EstadoEquipo',
            default: 'OPERATIVO',
          },
          numeroSerie: {
            type: 'string',
            example: 'DEL-2024-1092',
          },
          descripcion: {
            type: 'string',
            example: 'Monitor para estación de diseño gráfico',
          },
        },
      },
      UpdateEquipoInput: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            example: 'Monitor UltraSharp 27 pulgadas (Revisado)',
          },
          marca: {
            type: 'string',
            example: 'Dell',
          },
          estado: {
            $ref: '#/components/schemas/EstadoEquipo',
          },
          numeroSerie: {
            type: 'string',
            example: 'DEL-2024-1092',
          },
          descripcion: {
            type: 'string',
            example: 'Equipo reparado y operativo',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Mensaje descriptivo del error',
          },
        },
      },
    },
  },
};
