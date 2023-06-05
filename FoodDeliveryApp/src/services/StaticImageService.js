import { apiConstants } from "../constants";

const getFlagIcon = (
    code = 'VN',
    style = apiConstants.COUNTRY_FLAG.STYLE.FLAT,
    size = apiConstants.COUNTRY_FLAG.SIZE[64],
) => `${apiConstants.COUNTRY_FLAG.BASE_URL}/${style}/${size}/${code}.png`;
  
const getLogo = imageId =>
`${apiConstants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;

const getPoster = (imageId, quality = apiConstants.STATIC_IMAGE.QUALITY.SD) =>
`${apiConstants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
imageId,
size,
quality = apiConstants.STATIC_IMAGE.QUALITY.SD,
) => `${apiConstants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;

export default {getFlagIcon, getLogo, getPoster, getGalleryImage};