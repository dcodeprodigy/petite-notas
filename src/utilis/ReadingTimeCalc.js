
// Calculate reading time of a given content in minutes
const readingTime = ( content, wordsPerMinute = 220 ) => {
  if (!content) {
    return 0;
  }

  const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = plainText.trim().split(/\s+/).length; // Split by whitespace
  const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute); // Calculate reading time
  return estimatedMinutes;
}

export default readingTime;