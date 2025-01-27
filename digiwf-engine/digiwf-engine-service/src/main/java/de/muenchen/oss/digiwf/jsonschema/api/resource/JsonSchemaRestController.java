/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik der Landeshauptstadt München, 2020
 */

package de.muenchen.oss.digiwf.jsonschema.api.resource;

import de.muenchen.oss.digiwf.jsonschema.api.mapper.SchemaApiMapper;
import de.muenchen.oss.digiwf.jsonschema.api.transport.JsonSchemaTO;
import de.muenchen.oss.digiwf.jsonschema.domain.model.JsonSchema;
import de.muenchen.oss.digiwf.jsonschema.domain.service.JsonSchemaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    @Deprecated
    @PostMapping
    @Operation(description = "create a new json schema")
    @PreAuthorize("hasAuthority(T(de.muenchen.oss.digiwf.shared.security.AuthoritiesEnum).BACKEND_DEPLOY_RESOURCE.name())")
    public ResponseEntity<JsonSchemaTO> createJsonSchema(@RequestBody @Valid final JsonSchemaTO to) {
        final JsonSchema jsonSchema = this.schemaApiMapper.map2Model(to);
        return ResponseEntity.ok(this.schemaApiMapper.map2TO(this.schemaService.createJsonSchema(jsonSchema)));
    }

    /**
     * Get a json schema by key
     *
     * @param key Key of the json schema.
     * @return json schema
     */
    @GetMapping("/{key}")
    @Operation(description = "get json schema by key")
    public ResponseEntity<JsonSchemaTO> getJsonSchema(@PathVariable final String key) {
        return this.schemaService.getByKey(key)
            .map(jsonSchema -> ResponseEntity.ok(this.schemaApiMapper.map2TO(jsonSchema)))
            .orElseGet(() -> ResponseEntity.notFound().build());

    }


}
