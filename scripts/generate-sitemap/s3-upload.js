const S3 = require('aws-sdk/clients/s3');

const {
  parsed: { AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION }
} = require('dotenv').config();

module.exports = async (path, sitemap) => {
  const s3 = new S3({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION });

  await s3
    .upload({
      Bucket: AWS_S3_BUCKET,
      Key: path,
      Body: sitemap,
      ContentType: 'application/xml'
    })
    .promise();
};
