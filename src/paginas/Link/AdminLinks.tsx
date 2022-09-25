import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"
import { Link as RouterLink } from 'react-router-dom'
import ILink from '../../interface/ILink'


const AdminLinks = () => {
    const [links, setLinks] = useState<ILink[]>([])

    useEffect(() => {
        http.get<ILink[]>("/links")
            .then(res => setLinks(res.data))
    }, [])

    const excluirLink = (linkExcluido: ILink) => {
        http.delete(`links/${linkExcluido._id}/`)
            .then(() => {
                const listalinks = links.filter(link => link._id !== linkExcluido._id)
                setLinks([...listalinks])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Titulo
                        </TableCell>
                        <TableCell>
                            Link
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.map(link =>
                        <TableRow key={link._id}>
                            <TableCell> {link.label} </TableCell>
                            <TableCell>
                                <Link href={link.url} target="_blank" rel="noopener">
                                    <Button variant="contained" >Link</Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link component={RouterLink} to='/links/:id'>
                                    <Button variant="contained">
                                        Editar
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => excluirLink(link)}
                                >
                                    Deletar
                                </Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminLinks