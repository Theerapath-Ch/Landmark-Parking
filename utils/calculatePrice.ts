export const calculatePrice = (
  in_at: string,
  out_at: string,
  discount: string,
) => {
  const [inH, inM] = in_at.split(":").map(Number);
  const [outH, outM] = out_at.split(":").map(Number);

  // to minite
  const inMinutes = inH * 60 + inM;
  const rawOutMinutes = outH * 60 + outM;

  const outMinutes =
    rawOutMinutes < inMinutes ? rawOutMinutes + 24 * 60 : rawOutMinutes;

  //result
  const diffMinutes = outMinutes - inMinutes;

  if (discount == "Landmark") {
    // 180 minutes ( 3 hr ) => free
    const freeMinutes = 3 * 60;
    // < 180 minutes
    if (diffMinutes <= freeMinutes) return 0;

    // find minutes > 180
    const extraMinutes = diffMinutes - freeMinutes;

    // to hours
    const hours = Math.ceil(extraMinutes / 60);
    // 1 hr/10 bath
    return hours * 10;
  
  } else if (discount == "Lotus") {
    const freeMinutes = 60;

    if (diffMinutes <= freeMinutes) return 0;

    const extraMinutes = diffMinutes - freeMinutes;
    const hours = Math.ceil(extraMinutes / 60);
    return hours * 40;
  }

  //----------------------- no discount

  if (diffMinutes <= 25) return 0;

  if (diffMinutes <= 60) return 40;

  // parking > 60 minutes
  const extraMinutes = diffMinutes - 60;

  // to hours
  const extraHours = Math.ceil(extraMinutes / 60);

  return 40 + extraHours * 40;
};
