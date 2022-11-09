/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik der Landeshauptstadt München, 2020
 */

package io.muenchendigital.digiwf.jsonschema.api.resource;

import io.muenchendigital.digiwf.jsonschema.api.mapper.SchemaApiMapper;
import io.muenchendigital.digiwf.jsonschema.api.transport.JsonSchemaTO;
import io.muenchendigital.digiwf.jsonschema.domain.model.JsonSchema;
import io.muenchendigital.digiwf.jsonschema.domain.service.JsonSchemaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

/**
 * Rest API to handle schemas.
 *
 * @author externer.dl.horn
 */
@Validated
@Transactional
@RestController
@RequestMapping("/rest/jsonschema")
@RequiredArgsConstructor
@Tag(name = "SchemaRestController", description = "API to handle json schemas")
public class JsonSchemaRestController {

    private final JsonSchemaService schemaService;
    private final SchemaApiMapper schemaApiMapper;

    /**
     * Create a new json schema.
     *
     * @param to Json schema that is created
     * @return json schema
     */
    @PostMapping
    @Operation(description = "create a new json schema")
    @PreAuthorize("hasAuthority(T(io.muenchendigital.digiwf.shared.security.AuthoritiesEnum).BACKEND_DEPLOY_RESOURCE.name())")
    public ResponseEntity<JsonSchemaTO> createJsonSchema(@RequestBody @Valid final JsonSchemaTO to) {
        final JsonSchema jsonSchema = this.schemaApiMapper.map2Model(to);
        return ResponseEntity.ok(this.schemaApiMapper.map2TO(this.schemaService.createJsonSchema(jsonSchema)));
    }

    /**
     * Get a json schema by key
     *
     * @param key Key of the json schema
     * @return json schema
     */
    @GetMapping("/{key}")
    @Operation(description = "get json schema by key")
    @PreAuthorize("hasAuthority(T(io.muenchendigital.digiwf.shared.security.AuthoritiesEnum).BACKEND_DEPLOY_RESOURCE.name())")
    public ResponseEntity<JsonSchemaTO> getJsonSchema(@PathVariable final String key) {
        final Optional<JsonSchema> schema = this.schemaService.getByKey(key);
        if (schema.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(this.schemaApiMapper.map2TO(schema.get()));
    }


}