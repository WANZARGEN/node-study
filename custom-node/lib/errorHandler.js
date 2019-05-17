/**--------------------------------------------------------------------------*
 * 
 *
 * @module errorHandler
 *
 * @description :: Error handler
 * 
 * @author wanzargen
 * 
 * @since 2018-08-21
 * 
 * 
 *----------------------------------------------------------------------------*/



 /**---------------------------------------------------------------------------*
  *                                    EXPORTS                                 *
  *----------------------------------------------------------------------------*/

module.exports = function(res, err, status, message, hide) {

  if (!hide) console.error(message, err)

  return res.status(status).json({
    message: message,
    error: err
  })
  
}