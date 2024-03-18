package de.muenchen.oss.digiwf.alw.integration.application;

import de.muenchen.oss.digiwf.alw.integration.application.port.in.GetResponsibilityInPort;
import de.muenchen.oss.digiwf.alw.integration.application.port.out.AlwResponsibilityOutPort;
import de.muenchen.oss.digiwf.alw.integration.application.port.out.OrgStructureMapper;
import de.muenchen.oss.digiwf.alw.integration.domain.exception.AlwException;
import de.muenchen.oss.digiwf.alw.integration.domain.model.Responsibility;
import de.muenchen.oss.digiwf.alw.integration.domain.model.ResponsibilityRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.apache.logging.log4j.util.Strings;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Component
@RequiredArgsConstructor
@Validated
public class GetResponsibilityUseCase implements GetResponsibilityInPort {

    private final OrgStructureMapper orgStructureMapper;
    private final AlwResponsibilityOutPort alwResponsibilityOutPort;

    @Override
    @NonNull
    public Responsibility getResponsibility(@NonNull @Valid ResponsibilityRequest request) throws AlwException {
        val sachbearbeiter = alwResponsibilityOutPort.getResponsibleSachbearbeiter(request.getAzrNummer())
                .orElseThrow(() -> new AlwException("Could not find ALW responsible for " + request.getAzrNummer()));
        val mappedResponsibility = orgStructureMapper.map(sachbearbeiter);
        if (Strings.isEmpty(mappedResponsibility))
            throw new AlwException(String.format("Responsible %s for azr %s does not match any know responsibility!", sachbearbeiter, request.getAzrNummer()));
        return Responsibility.builder().orgUnit(orgStructureMapper.map(sachbearbeiter)).build();
    }
}
