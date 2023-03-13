import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IS3Config } from 'src/common/config/interface';
import * as S3 from 'aws-sdk/clients/s3';
import { IFile } from './interface/file.interface';
import { generateRandomFileName } from 'src/common/utils';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucket: string;
  private readonly rootDir: string = 'ch';

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<IS3Config>('storage');
    this.s3 = new S3({
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
      endpoint: config.endpoint,
      signatureVersion: 'v4',
    });
    this.bucket = config.bucket;
    this.rootDir = config.root;
  }

  async upload(
    file: IFile,
    bucket = this.bucket,
  ): Promise<S3.ManagedUpload.SendData> {
    return this.s3
      .upload({
        ACL: 'public-read',
        Body: file.buffer,
        Bucket: bucket,
        ContentType: file.mimetype,
        Key: `${this.rootDir}/${generateRandomFileName(file.mimetype)}`,
      })
      .promise();
  }
}
