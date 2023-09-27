function status(request, response) {
  response.status(200).json({
    "message": "Comunicação com a api feita com sucesso"
  })
}

export default status;