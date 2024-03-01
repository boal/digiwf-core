package de.muenchen.oss.digiwf.ticket.integration.application.port.in;

import de.muenchen.oss.digiwf.ticket.integration.domain.model.Article;
import de.muenchen.oss.digiwf.ticket.integration.domain.model.TicketStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public interface WriteArticleInPort {

    void writeArticle(@NotBlank String ticketId, @NotNull Article article, TicketStatus status);
}