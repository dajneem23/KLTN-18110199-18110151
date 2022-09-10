/**
 * Generate text alias
 */
export const generateTextAlias = (text: string) => {
  let newText = text.toLowerCase().trim();
  newText = newText.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  newText = newText.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  newText = newText.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  newText = newText.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  newText = newText.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  newText = newText.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  newText = newText.replace(/đ/g, 'd');
  newText = newText.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  newText = newText.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  newText = newText.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  newText = newText.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  newText = newText.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  newText = newText.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  newText = newText.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  newText = newText.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  newText = newText.replace(/\u02C6|\u0306|\u031B/g, '');
  newText.toLowerCase();

  return [text.toLowerCase().trim(), newText];
};
