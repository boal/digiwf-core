package de.muenchen.oss.digiwf.s3.integration.client.configuration;

import de.muenchen.oss.digiwf.s3.integration.client.ApiClient;
import de.muenchen.oss.digiwf.s3.integration.client.api.FileApiApi;
import de.muenchen.oss.digiwf.s3.integration.client.api.FolderApiApi;
import de.muenchen.oss.digiwf.s3.integration.client.properties.S3IntegrationClientProperties;
import de.muenchen.oss.digiwf.s3.integration.client.service.ApiClientFactory;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.oauth2.client.AuthorizedClientServiceOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@ComponentScan(
        basePackages = {
                "de.muenchen.oss.digiwf.s3.integration.gen",
                "de.muenchen.oss.digiwf.s3.integration.client"
        },
        excludeFilters = {
                @ComponentScan.Filter(
                        type = FilterType.ASSIGNABLE_TYPE,
                        classes = {
                                /**
                                 * Exclude to avoid multiple instantiation of multiple beans with same name.
                                 * This class is instantiated in {@link S3IntegrationClientAutoConfiguration}
                                 * to give the bean another name.
                                 */
                                ApiClient.class,
                                FileApiApi.class,
                                FolderApiApi.class
                        }
                )
        })
@RequiredArgsConstructor
@EnableConfigurationProperties(S3IntegrationClientProperties.class)
@Slf4j
public class S3IntegrationClientAutoConfiguration {

    public final S3IntegrationClientProperties s3IntegrationClientProperties;

    @PostConstruct
    public void init() {
        log.info("[DIGIWF-S3-INTEGRATION-CLIENT]: Staring integration client, security is {}.", s3IntegrationClientProperties.isEnableSecurity() ? "enabled" : "disabled");
    }

    @Bean
    @ConditionalOnProperty(prefix = "io.muenchendigital.digiwf.s3.client", name = "securityEnabled", havingValue = "true")
    public ApiClientFactory securedApiClientFactory(final ClientRegistrationRepository clientRegistrationRepository,
                                                    final OAuth2AuthorizedClientService authorizedClientService) {
        return new ApiClientFactory(
                this.s3IntegrationClientProperties.getDocumentStorageUrl(),
                this.webClient(clientRegistrationRepository, authorizedClientService)
        );
    }

    @Bean
    @ConditionalOnProperty(prefix = "io.muenchendigital.digiwf.s3.client", name = "securityEnabled", havingValue = "false", matchIfMissing = true)
    public ApiClientFactory apiClientFactory() {
        return new ApiClientFactory(
                this.s3IntegrationClientProperties.getDocumentStorageUrl(),
                WebClient.builder().build()
        );
    }

    private WebClient webClient(
            final ClientRegistrationRepository clientRegistrationRepository,
            final OAuth2AuthorizedClientService authorizedClientService
    ) {
        final var oauth = new ServletOAuth2AuthorizedClientExchangeFilterFunction(
                new AuthorizedClientServiceOAuth2AuthorizedClientManager(
                        clientRegistrationRepository, authorizedClientService
                )
        );
        oauth.setDefaultClientRegistrationId("s3");
        return WebClient.builder()
                .apply(oauth.oauth2Configuration())
                .build();
    }

}
