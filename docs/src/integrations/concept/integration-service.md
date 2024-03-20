# Integrationskonzept

Das Integrationskonzept von DigiWF bietet eine flexible und skalierbare Lösung für die Integration von Drittsystemen. Zur
Integration in Bpmn-Prozesse werden Bausteine (Element-Templates) bereitgestellt, die die technische Implementierung der
Integration weitgehend verbergen.

## Modellierung

Die Integration wird über eine Call Activity aus dem Prozess aufgerufen. Hierfür stehen Element-Templates zur
Verfügung, mit deren Hilfe die Modellierer die Integration schnell und einfach in ihren Prozess einbinden können. In den
Element-Templates wird die Struktur der Daten, die an die Integration übergeben werden, definiert. Außerdem werden der
Name der Integration sowie der Type Header erfasst. Falls nicht das Default-Topic verwendet werden soll, kann ein
Kafka-Topic angegeben werden.

> Der Type Header sollte bereits vom Entwickler vorausgefüllt werden. Die verfügbaren Topics sollten über eine
> Konfiguration gesetzt werden, da sie sich je nach Umgebung unterscheiden können.

## Anwendungsaufbau

Die Integrationsservices von DigiWF basieren auf einer Spring-Boot-Starter-Paketstruktur, die aus Core-, Starter-,
Example- und Service-Modulen besteht:

- **core**, der die Businesslogik beinhaltet
- **starter** Module, das den *core* verwendet, um Spring Beans zur Verfügung zu stellen
- **example** Anwendung, die die Verwendung des Starters zeigt
- **service** Anwendung, die bereits vorkonfiguriert ist und direkt verwendet werden kann. Diese Service-Anwendung ist üblicherweise als Docker Image im [dockerhub](https://hub.docker.com/u/itatm) veröffentlicht. Eine solche Service-Anwendung ist nur bei generischen Integrationen vorhanden.

> Durch die Bereitstellung von Spring-Boot-Startern bietet DigiWF die nötige Flexibilität, um die Integrationsservices
> bei Bedarf zu erweitern oder zu verändern.

## Kommunikation

Die Integrationen werden an einen Event Broker (z. B. Kafka) angebunden. Jede Integration erhält ein eigenes Topic und
verarbeitet Nachrichten daraus. Am Ende werden die Ergebnisse über ein "Correlate Message Event" zurückgespielt. Die
Implementierung erfolgt mit Spring Cloud Stream. Falls es zusätzlich eine synchrone Schnittstelle geben soll, werden 
`RestController` bereitgestellt, die es den Anwendern ermöglichen, die Integrationsservices über eine REST-Schnittstelle
aufzurufen.

> Durch die Verwendung von Spring Cloud Stream können unterschiedliche Event Broker verwendet werden, ohne dass die
> Integrationsservices angepasst werden müssen.

### Client-Bibliothek für synchrone Kommunikation

In speziellen Fällen empfiehlt es sich, eine zusätzliche Client-Bibliothek bereitzustellen, um die synchrone
Kommunikation (z. B. HTTP) zu vereinfachen. Dadurch muss nicht jeder Benutzer der Integration erneut die HTTP-Requests
implementieren bzw. generieren und kann direkt auf die Client-Bibliothek zurückgreifen.