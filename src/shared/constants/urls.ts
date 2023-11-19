
const servidorJS = "http://localhost:3000"
const servidorPython = "http://localhost:5000"


export const URL_USER = `${servidorJS}/user`;
export const URL_AUTH = `${servidorJS}/auth`;
export const URL_TEMPLATE_ATIVO = `${servidorJS}/template/listar-templates-ativos`
export const URL_MYTEMPLATES_PENDENTES = `${servidorJS}/template/meus-templates-pendentes`;
export const URL_MYTEMPLATES_INATIVOS = `${servidorJS}/template/meus-templates-inativos`;
export const URL_TEMPLATE_DOWNLOAD = `${servidorPython}/download_excel/`;

//ADMIN ROUTES
export const URL_UPLOAD_GET_ALL_USERS = `${servidorJS}/user/getAllUsers`;
export const URL_UPLOAD_GET_ALL = `${servidorPython}/getAllUploads`;
export const URL_UPLOAD_DOWNLOAD = `${servidorPython}/download`;
export const URL_TEMPLATE = `${servidorJS}/template`
export const URL_Template_ID = `${servidorJS}/template/{templateId}`;
export const URL_TEMPLATEADMIN_ATIVO = `${servidorJS}/template/ativos`;
export const URL_TEMPLATEADMIN_PENDENTE = `${servidorJS}/template/pendentes`;
export const URL_TEMPLATEADMIN_INATIVO = `${servidorJS}/template/inativos`;
export const URL_TEMPLATE_DELETE = `${servidorJS}`
export const URL_TEMPLATEADMIN_ALL = `${servidorJS}/template/all`
export const URL_CATEGORY = `${servidorJS}/category`;
export const URL_CATEGORY_ID = `${servidorJS}/category/{categoryId}`;
