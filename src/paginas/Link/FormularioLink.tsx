import { TextField, Button, Typography, Box, Container, Paper, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import http from "../../http";
import ILinks from "../../interface/ILink";
import ITag from "../../interface/ITag"

const FormularioLink = () => {
  const parametros = useParams()
 
  const [nomeLink, setNomeLink] = useState('')
  const [url, setUrl] = useState('')

  const[tag, setTag] = useState('')
  const [tags, setTags] = useState<ITag[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    
    http.get<ITag[]>('/tags')
        .then(res => setTags(res.data))

    if(parametros.id){
      http.get<ILinks>(`links/${parametros.id}`)
          .then(res => setNomeLink(res.data.label))

     http.get<ILinks>(`links/${parametros.id}`)
        .then(res => setUrl(res.data.url))
    }
    
  }, [parametros]);

  const submeterForm = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if(parametros.id){
            http.put(`links/${parametros.id}`,{
              label:nomeLink,
              url:url,
              tag:tag
            })
              .then(()=> {
                alert('Restaurante atualizado com sucesso')
              })
          }else {
            http.post('/links', {
              label:nomeLink,
              url:url,
              tag:tag
            })
            .then(()=> {
              alert('Restaurante cadastrado com sucesso')
            })
            .then(()=> {
              setNomeLink('')
              setUrl('')
              setTag('')
            })
          }
   
  };

  return (
    <>
      <Box>
        <Container maxWidth='lg' sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <Box component='form' onSubmit={submeterForm} sx={{ width: '100%' }}>
                <Typography component="h1" variant="h6">
                  Fórmulario de Link
                </Typography>
                <TextField
                  value={nomeLink}
                  onChange={(e) => setNomeLink(e.target.value)}
                  label="Titulo do link"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  value={url}
                  onChange={evento => setUrl(evento.target.value)}
                  label="Url do Link"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />
                <FormControl margin="dense" fullWidth >
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => 
                        <MenuItem key={tag._id} value={tag._id}>
                            {tag.valor}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  fullWidth
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1)
                  }}
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  fullWidth
                >
                  Voltar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default FormularioLink;