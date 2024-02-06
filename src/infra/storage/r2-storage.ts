import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { EnvService } from '../env/env.service'
import { env } from 'process'
import { randomUUID } from 'crypto'
import { Injectable } from '@nestjs/common'


@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvService) {
    const cloudFlareAccountId: string = envService.get('CLOUDFLARE_ACCOUNT_ID')
    const accountId = envService.get('AWS_ACCESS_KEY_ID')
    const secretAccesKey = envService.get('ASW_SECRET_ACCESS_KEY')

    this.client = new S3Client({
      endpoint: `https://${cloudFlareAccountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: accountId,
        secretAccessKey: secretAccesKey,
      },
    })
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )

    return {
      url: uniqueFileName,
    }
  }
}