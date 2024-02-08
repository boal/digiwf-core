const basicSchema = {
  "type": "object",
  "x-display": "tabs",
  "x-props": {
    "grow": true
  },
  "x-options": {
    "childrenClass": "pr-5 pl-0",
  }
};

const basicAttributes = {
  "title": "General",
  "type": "object",
  "properties": {
    "fieldType": {
      "type": "string",
      "title": "Type",
      "readOnly": true
    },
    "type": {
      "type": "string",
      "x-display": "hidden",
    },
    "key": {
      "type": "string",
      "title": "Key",
      "x-props": {
        "outlined": true,
        "dense": true
      },
      "x-rules": [
        "required"
      ]
    },
    "title": {
      "type": "string",
      "title": "Titel",
      "x-props": {
        "outlined": true,
        "dense": true
      },
      "x-rules": [
        "required"
      ]
    },
    "description": {
      "type": "string",
      "title": "Beschreibung",
      "x-props": {
        "outlined": true,
        "dense": true
      }
    },
    "readOnly": {
      "type": "boolean",
      "title": "Readonly",
      "x-props": {
        "outlined": true,
        "dense": true
      }
    }
  }
};

const basicOptions = {
  "title": "Optionen",
  "type": "object",
  "properties": {
    "x-props": {
      "type": "object",
      "description": "Ui",
      "properties": {
        "dense": {
          "type": "boolean",
          "title": "Dense",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "outlined": {
          "type": "boolean",
          "title": "Outlined",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        }
      }
    },
    "x-options": {
      "type": "object",
      "properties": {
        "fieldColProps": {
          "description": "Größe (max. 12)",
          "type": "object",
          "properties":
            {
              "sm": {
                "type": "integer",
                "title": "Standardgröße",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
              "cols": {
                "type": "integer",
                "title": "Größe auf kleinen Geräten",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
            }
        },
        "messages": {
          "type": "object",
          "description": "Messages",
          "properties": {
            "pattern": {
              "type": "string",
              "title": "Pattern (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            }
          }
        }
      }
    }
  }
};

const optionsWithCustomErrorMessages = {
  "title": "Optionen",
  "type": "object",
  "properties": {
    "x-props": {
      "type": "object",
      "description": "Ui",
      "properties": {
        "dense": {
          "type": "boolean",
          "title": "Dense",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "outlined": {
          "type": "boolean",
          "title": "Outlined",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        }
      }
    },
    "x-options": {
      "type": "object",
      "properties": {
        "fieldColProps": {
          "description": "Größe (max. 12)",
          "type": "object",
          "properties":
            {
              "sm": {
                "type": "integer",
                "title": "Standardgröße",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
              "cols": {
                "type": "integer",
                "title": "Größe auf kleinen Geräten",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
            }
        },
        "messages": {
          "type": "object",
          "description": "Messages",
          "properties": {
            "pattern": {
              "type": "string",
              "title": "Pattern (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "minLength": {
              "type": "string",
              "title": " {minLength} characters minimum",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "maxLength": {
              "type": "string",
              "title": "{maxLength} characters maximum",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            }
          }
        }
      }
    }
  }
};

const optionsNumberWithCustomErrorMessages = {
  "title": "Optionen",
  "type": "object",
  "properties": {
    "x-props": {
      "type": "object",
      "description": "Ui",
      "properties": {
        "dense": {
          "type": "boolean",
          "title": "Dense",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "outlined": {
          "type": "boolean",
          "title": "Outlined",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        }
      }
    },
    "x-options": {
      "type": "object",
      "properties": {
        "fieldColProps": {
          "description": "Größe (max. 12)",
          "type": "object",
          "properties":
            {
              "sm": {
                "type": "integer",
                "title": "Standardgröße",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
              "cols": {
                "type": "integer",
                "title": "Größe auf kleinen Geräten",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
            }
        },
        "messages": {
          "type": "object",
          "description": "Messages",
          "properties": {
            "pattern": {
              "type": "string",
              "title": "Pattern (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "minimum": {
              "type": "string",
              "title": "The value must be greater than or equal to {minimum}",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "maximum": {
              "type": "string",
              "title": "The value must be lower than or equal to {maximum}",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            }
          }
        }
      }
    }
  }
};

const optionsArrayWithCustomErrorMessages = {
  "title": "Optionen",
  "type": "object",
  "properties": {
    "x-props": {
      "type": "object",
      "description": "Ui",
      "properties": {
        "dense": {
          "type": "boolean",
          "title": "Dense",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "outlined": {
          "type": "boolean",
          "title": "Outlined",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        }
      }
    },
    "x-options": {
      "type": "object",
      "properties": {
        "fieldColProps": {
          "description": "Größe (max. 12)",
          "type": "object",
          "properties":
            {
              "sm": {
                "type": "integer",
                "title": "Standardgröße",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              },
              "cols": {
                "type": "integer",
                "title": "Größe auf kleinen Geräten",
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                }
              }
            }
        },
        "messages": {
          "type": "object",
          "description": "Messages",
          "properties": {
            "pattern": {
              "type": "string",
              "title": "Pattern (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "minItems": {
              "type": "string",
              "title": "Min {minItems} Elements (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            },
            "maxItems": {
              "type": "string",
              "title": "Max {maxItems} Elements (Error Message)",
              "x-props": {
                "outlined": true,
                "dense": true
              }
            }
          }
        }
      }
    }
  }
};

const basicValidation = {
  "title": "Validierung",
  "type": "object",
  "properties": {
    "pattern": {
      "type": "string",
      "title": "Pattern (regex)",
      "x-props": {
        "outlined": true,
        "dense": true
      }
    },
    "x-rules": {
      "type": "array",
      "title": "Weitere Regeln",
      "items": {
        "type": "string",
        "enum": [
          "required",
        ]
      },
      "x-display": "checkbox"
    }
  }
};

const textFeldSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      "properties": {
        ...basicAttributes.properties,
        "default": {
          "type": "string",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...optionsWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minLength": {
          "type": "integer",
          "title": "min. Länge",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxLength": {
          "type": "integer",
          "title": "max. Länge",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const integerSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      "properties": {
        ...basicAttributes.properties,
        "default": {
          "type": "integer",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...optionsNumberWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minimum": {
          "type": "integer",
          "title": "min. value",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maximum": {
          "type": "integer",
          "title": "max. value",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const numberSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      "properties": {
        ...basicAttributes.properties,
        "default": {
          "type": "integer",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...optionsNumberWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minimum": {
          "type": "number",
          "title": "min. value",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maximum": {
          "type": "number",
          "title": "max. value",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const markdownSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "markdown"
        },
        "default": {
          "type": "string",
          "title": "Default",
          "x-display": "markdown",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

const textAreaSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "textarea"
        },
        "default": {
          "type": "string",
          "title": "Default",
          "x-display": "textarea",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...optionsWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minLength": {
          "type": "integer",
          "title": "min. Länge",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxLength": {
          "type": "integer",
          "title": "max. Länge",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const switchSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "switch"
        },
        "default": {
          "type": "boolean",
          "title": "Default",
          "default": false,
          "x-display": "switch",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

const dateSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "custom-date-input"
        },
        "format": {
          "const": "date"
        },
        "default": {
          "type": "string",
          "format": "date",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      // all basic options without messages
      ...basicOptions,
      properties: {
        ...basicOptions.properties,
        "x-options": {
          ...basicOptions.properties["x-options"],
          properties: {
            ...basicOptions.properties["x-options"].properties,
            fieldColProps: {
              ...basicOptions.properties["x-options"].properties.fieldColProps,
              properties: {
                ...basicOptions.properties["x-options"].properties.fieldColProps.properties,
                messages: {}
              }
            }
          }
        }
      }
    },
    {
      ...basicValidation,
      properties: {
        "x-rules": basicValidation.properties["x-rules"],
      }
    }
  ]
};

const constSchema = {
  "title": "General",
  "type": "object",
  "properties": {
    "fieldType": {
      "type": "string",
      "title": "Type",
      "readOnly": true
    },
    "type": {
      "type": "string",
      "x-display": "hidden",
    },
    "key": {
      "type": "string",
      "title": "Key",
      "x-props": {
        "outlined": true,
        "dense": true
      },
      "x-rules": [
        "required"
      ]
    },
    "const": {
      "type": "string",
      "title": "Const",
      "x-props": {
        "outlined": true,
        "dense": true
      },
      "x-rules": [
        "required"
      ]
    },
  }
};

const objectInput = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "additionalProperties": {
          "const": false,
        },
      }
    },
    {
      ...basicOptions
    }
  ]
};

const timeSchema = {
    ...basicSchema,
    allOf: [
      {
        ...basicAttributes,
        properties: {
          ...basicAttributes.properties,
          "x-display": {
            "const": "custom-time-input"
          },
          "format": {
            "const": "time"
          },
          "default": {
            "type": "string",
            "format": "time",
            "title": "Default",
            "x-props": {
              "outlined": true,
              "dense": true
            }
          }

        },
      },
      {
        ...basicOptions,
        "properties": {
          ...basicOptions.properties,
          "x-options": {
            "type": "object",
            "properties": {
              "timePickerProps": {
                "type": "object",
                "properties": {
                  "format": {
                    "const": "24hr"
                  }
                }
              },
              "fieldColProps": {
                "description": "Size (max. 12)",
                "type": "object",
                "properties":
                  {
                    "sm": {
                      "type": "integer",
                      "title": "default size",
                      "x-props": {
                        "outlined": true,
                        "dense": true
                      },
                      "x-options": {
                        "fieldColProps": {
                          "cols": 12,
                          "sm": 6
                        }
                      }
                    },
                    "cols": {
                      "type": "integer",
                      "title": "Size on small devices",
                      "x-props": {
                        "outlined": true,
                        "dense": true
                      },
                      "x-options": {
                        "fieldColProps": {
                          "cols": 12,
                          "sm": 6
                        }
                      }
                    },
                    "messages": {
                      "type": "object",
                      "description": "Messages",
                      "properties": {
                        "pattern": {
                          "type": "string",
                          "title": "Pattern (Error Message)",
                          "x-props": {
                            "outlined": true,
                            "dense": true
                          }
                        },
                        "minimum": {
                          "type": "string",
                          "title": "Minimum (Error Message)",
                          "x-props": {
                            "outlined": true,
                            "dense": true
                          }
                        },
                        "maximum": {
                          "type": "string",
                          "title": "Maximum (Error Message)",
                          "x-props": {
                            "outlined": true,
                            "dense": true
                          }
                        }
                      }
                    }
                  }
              },
            }
          }
        }
      },
      {
        ...basicValidation
      }
    ]
  }
;

const checkboxSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "type": "string",
          "title": "Display",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "default": {
          "type": "boolean",
          "title": "Default",
          "default": false,
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }

      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

const selectSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "type": "string",
          "title": "Display",
          "enum": [
            "radio",
            "select"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          },
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "default": {
          "type": "string",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      "title": "Select",
      "type": "object",
      "properties": {
        "anyOf": {
          "type": "array",
          "title": "Entries",
          "x-itemTitle": "title",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "title": "Titel",
                "x-rules": [
                  "required"
                ]
              },
              "const": {
                "type": "string",
                "title": "Value",
                "x-rules": [
                  "required"
                ]
              }
            }
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

const multiselectSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "type": "string",
          "title": "Display",
          "enum": [
            "checkbox",
            "select",
            "switch"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          },
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "default": {
          "type": "array",
          "title": "default",
          "items": {
            "type": "string"
          },
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        }
      }
    },
    {
      "title": "Select",
      "type": "object",
      "properties": {
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "const": "string"
            },
            "anyOf": {
              "type": "array",
              "title": "Entries",
              "x-itemTitle": "title",
              "items": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "title": "Titel",
                    "x-rules": [
                      "required"
                    ]
                  },
                  "const": {
                    "type": "string",
                    "title": "Value",
                    "x-rules": [
                      "required"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      ...optionsArrayWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minItems": {
          "type": "integer",
          "title": "minimum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxItems": {
          "type": "integer",
          "title": "maximum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const fileSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "custom-multi-file-input"
        },
        "filePath": {
          "type": "string",
          "title": "Filepath",
          "x-props": {
            "outlined": true,
          },
          "x-rules": [],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        },
        "properties": {
          "const": {"key": {"type": "string"}, "amount": {"type": "integer"}}
        },
        "uuidEnabled": {
          "type": "boolean",
          "title": "Unique identifier?",
          "description": "Creates an unique, which will add to the the directory path. It should be used in object lists.",

          "default": false,
          "x-props": {
            "outlined": true,
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation,
      properties: {
        "x-rules": {
          "type": "array",
          "title": "Regeln",
          "items": {
            "type": "string",
            "enum": [
              "requiredObject",
            ]
          },
          "x-display": "checkbox"
        },
        "maxFiles": {
          "type": "integer",
          "title": "Maximum number of files",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxFileSize": {
          "type": "integer",
          "title": "Maximum file size in MB",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxTotalSize": {
          "type": "integer",
          "title": "Maximum total size of all files in MB",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "accept": {
          "type": "string",
          "title": "Permitted file formats",
          "description": "The file formats must be specified as MIME type and comma-separated.",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const userinputSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "custom-user-input"
        },
        "ldap-groups": {
          "type": "string",
          "title": "Ldap Gruppen",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "default": {
          "type": "string",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

const multiUserinputSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "custom-multi-user-input"
        },
        "ldap-groups": {
          "type": "string",
          "title": "Ldap Gruppen",
          "x-props": {
            "outlined": true,
            "dense": true
          },
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 6
            }
          }
        },
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "const": "string"
            }
          }
        },
        "default": {
          "type": "array",
          "title": "default",
          "items": {
            "type": "string"
          },
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        }
      }
    },
    {
      ...optionsArrayWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minItems": {
          "type": "integer",
          "title": "minimum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxItems": {
          "type": "integer",
          "title": "maximum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const dmsInputSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "x-display": {
          "const": "custom-dms-input"
        },
        "dmsSystem": {
          "type": "string",
          "title": "Dms system",
          "default": "mucs",
          "enum": [
            "mucs"
          ],
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        },
        "objectclass": {
          "type": "string",
          "title": "Objectclass",
          "default": "Schriftstueck",
          "enum": [
            "Sachakte",
            "Vorgang",
            "Eingang",
            "Ausgang",
            "Intern",
            "Schriftstueck"
          ],
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        },
        "default": {
          "type": "array",
          "title": "Default",
          "description": "List of coos or links to be checked by the input",
          "items": {
            "type": "string"
          },
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        },
        "items": {
          "type": "object"
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation,
      properties: {
        "minObjects": {
          "type": "integer",
          "title": "Mininum number of objects",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxObjects": {
          "type": "integer",
          "title": "Maximum number of objects",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const arrayInput = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "title": "Typ",
              "enum": [
                "string",
                "integer"
              ],
              "x-props": {
                "outlined": true,
                "dense": true
              }
            }
          }
        },
        "default": {
          "type": "array",
          "title": "default",
          "items": {
            "type": "string"
          },
          "x-props": {
            "outlined": true,
          },
          "x-rules": [
            "required"
          ],
          "x-options": {
            "fieldColProps": {
              "cols": 12,
              "sm": 12
            }
          }
        }
      }
    },
    {
      ...optionsArrayWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        ...basicValidation.properties,
        "minItems": {
          "type": "integer",
          "title": "minimum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxItems": {
          "type": "integer",
          "title": "maximum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

const arrayObjectInput = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      properties: {
        ...basicAttributes.properties,
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "const": "object"
            },
            "additionalProperties": {
              "const": false,
            },
            "properties": {
              "type": "object"
            }
          },
        }
      }
    },
    {
      ...optionsArrayWithCustomErrorMessages
    },
    {
      ...basicValidation,
      properties: {
        "minItems": {
          "type": "integer",
          "title": "minimum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        },
        "maxItems": {
          "type": "integer",
          "title": "maximum",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    }
  ]
};

export const genericSchema = {
  ...basicSchema,
  allOf: [
    {
      ...basicAttributes,
      "properties": {
        ...basicAttributes.properties,
        "default": {
          "type": "string",
          "title": "Default",
          "x-props": {
            "outlined": true,
            "dense": true
          }
        }
      }
    },
    {
      ...basicOptions
    },
    {
      ...basicValidation
    }
  ]
};

export const schemaMap: any = {
  "textarea": textAreaSchema,
  "text": textFeldSchema,
  "integer": integerSchema,
  "number": numberSchema,
  "date": dateSchema,
  "time": timeSchema,
  "boolean": checkboxSchema,
  "select": selectSchema,
  "multiselect": multiselectSchema,
  "file": fileSchema,
  "user-input": userinputSchema,
  "multi-user-input": multiUserinputSchema,
  "dms-input": dmsInputSchema,
  "array": arrayInput,
  "arrayObject": arrayObjectInput,
  "switch": switchSchema,
  "markdown": markdownSchema,
  "const": constSchema,
  "object": objectInput,
  "objectType": objectInput,
};
