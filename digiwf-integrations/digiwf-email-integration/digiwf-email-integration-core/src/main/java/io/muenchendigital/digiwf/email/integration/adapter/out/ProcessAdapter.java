package io.muenchendigital.digiwf.email.integration.adapter.out;

import io.muenchendigital.digiwf.email.integration.application.port.out.CorrelateMessagePort;
import io.muenchendigital.digiwf.message.process.api.ProcessApi;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class ProcessAdapter implements CorrelateMessagePort {

    private final ProcessApi processApi;

    @Override
    public void correlateMessage(final String processInstanceId, final String messageName, final Map<String, Object> message) {
        this.processApi.correlateMessage(processInstanceId, messageName, message);
    }

}