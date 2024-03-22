package de.muenchen.oss.digiwf.cosys.integration.application.port.out;

import de.muenchen.oss.digiwf.cosys.integration.model.GenerateDocument;

public interface SaveFileToStorageOutPort {

    void saveDocumentInStorage(final GenerateDocument generateDocument, final byte[] data);

}
