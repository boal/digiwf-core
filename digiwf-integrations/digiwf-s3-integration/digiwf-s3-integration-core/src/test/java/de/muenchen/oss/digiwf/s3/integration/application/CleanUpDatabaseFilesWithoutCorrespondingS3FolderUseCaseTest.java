package de.muenchen.oss.digiwf.s3.integration.application;

import de.muenchen.oss.digiwf.s3.integration.adapter.out.persistence.File;
import de.muenchen.oss.digiwf.s3.integration.adapter.out.persistence.FileRepository;
import de.muenchen.oss.digiwf.s3.integration.adapter.out.s3.S3Repository;
import de.muenchen.oss.digiwf.s3.integration.application.port.in.FileSystemAccessException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class CleanUpDatabaseFilesWithoutCorrespondingS3FolderUseCaseTest {

  @Mock
  private S3Repository s3Repository;

  @Mock
  private FileRepository fileRepository;

  private CleanUpDatabaseFilesWithoutCorrespondingS3FolderUseCase cleanUpDatabaseFolderWithoutCorrespondingS3Folder;

  @BeforeEach
  public void beforeEach() {
    this.cleanUpDatabaseFolderWithoutCorrespondingS3Folder = new CleanUpDatabaseFilesWithoutCorrespondingS3FolderUseCase(this.s3Repository, this.fileRepository);
  }

  @Test
  void shouldDatabaseFolderBeDeleted() throws FileSystemAccessException {
    final File file = new File();
    file.setPathToFile("folder/file.txt");

    // Creation date is more than one month ago.
    file.setCreatedTime(LocalDateTime.now().minusMonths(1).minusDays(1));
    Mockito.when(this.s3Repository.fileExists(file.getPathToFile()))
        .thenReturn(true);
    assertThat(this.cleanUpDatabaseFolderWithoutCorrespondingS3Folder.shouldDatabaseFileBeDeleted(file)).isFalse();

    Mockito.when(this.s3Repository.fileExists(file.getPathToFile()))
            .thenReturn(false);
    assertThat(this.cleanUpDatabaseFolderWithoutCorrespondingS3Folder.shouldDatabaseFileBeDeleted(file)).isTrue();

    // Creation date is exactly one month or less ago.
    file.setCreatedTime(LocalDateTime.now().minusMonths(1));
    Mockito.when(this.s3Repository.fileExists(file.getPathToFile()))
            .thenReturn(true);
    assertThat(this.cleanUpDatabaseFolderWithoutCorrespondingS3Folder.shouldDatabaseFileBeDeleted(file)).isFalse();

    Mockito.when(this.s3Repository.fileExists(file.getPathToFile()))
            .thenReturn(false);
    assertThat(this.cleanUpDatabaseFolderWithoutCorrespondingS3Folder.shouldDatabaseFileBeDeleted(file)).isFalse();
  }


}
