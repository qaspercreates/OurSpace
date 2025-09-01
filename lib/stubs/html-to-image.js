// Safe stub for server/build so imports don't crash
module.exports = {
  toPng: async () => 'data:image/png;base64,',
  toJpeg: async () => 'data:image/jpeg;base64,',
  toSvg: async () => '<svg></svg>'
};
