const AWS = require('aws-sdk');
const config = require('../config/config');

// Configure AWS
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
  s3ForcePathStyle: true
});

const s3 = new AWS.S3();

exports.uploadMedia = async (file, userId) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and MP4 are allowed.');
  }

  const params = {
    Bucket: config.aws.s3Bucket,
    Key: `${userId}/${Date.now()}-${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  const result = await s3.upload(params).promise();

  return {
    url: result.Location,
    key: result.Key
  };
};