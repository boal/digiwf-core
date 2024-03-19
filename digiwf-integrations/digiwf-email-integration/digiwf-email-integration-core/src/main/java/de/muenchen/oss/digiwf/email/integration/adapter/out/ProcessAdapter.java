package de.muenchen.oss.digiwf.email.integration.adapter.out;

import de.muenchen.oss.digiwf.email.integration.application.port.out.CorrelateMessageOutPort;
import de.muenchen.oss.digiwf.message.process.api.ProcessApi;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class ProcessAdapter implements CorrelateMessageOutPort {

    private final ProcessApi processApi;

    @Override
    public void correlateMessage(final String processInstanceId, final String type, final String integrationName, final Map<String, Object> message) {
        this.processApi.correlateMessage(processInstanceId, type, integrationName, message);
    }

}
