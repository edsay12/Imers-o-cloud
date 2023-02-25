function getUserCledentials(req: Request) {
  const [ idToken ] = req.headers;
  console.log(idToken);
}
