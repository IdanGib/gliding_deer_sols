// Missing Time to live
const cachedRoomDataMap = {};
const ttlMap = {}; // fix - ttl Map<number, { ttl, createdAt }>
const DEFAULT_TTL = 42000;
async function readRoomFromDb(roomId) {}

function validTTL(roomId) {
  const data = ttlMap[roomId];
  if (!data) {
    return false;
  }
  return data.ttl < (Date.now() - data.createdAt);
}

async function fetchRoomData(roomId, ttl = DEFAULT_TTL) {
  const cachedRoomData = cachedRoomDataMap[roomId];
  if (cachedRoomData && validTTL(roomId)) {
    return cachedRoomData;
  }
  const roomData = await readRoomFromDb(roomId);
  cachedRoomDataMap.set(roomId, roomData);
  ttlMap.set(roomId, { ttl, createdAt: Date.now() });
  return roomData;
}