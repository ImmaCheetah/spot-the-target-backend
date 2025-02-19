function isInRange(userX, userY, targetX, targetY) {
  const radius = 20;

  // Formula for distance from center of circle to point
  let distance = Math.sqrt(
    Math.pow(userX - targetX, 2) + Math.pow(userY - targetY, 2),
  );

  if (distance <= radius) {
    return true;
  } else {
    return false;
  }
}

module.exports = { isInRange };
