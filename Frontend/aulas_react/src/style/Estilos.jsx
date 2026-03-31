/** @type {{ [key: string]: import('react').CSSProperties }} */

export const estilos = {
    tituloModulo: { 
        color: 'blue', 
        fontWeight: 'bold' 
    },
    descricaoModulo: {
        fontStyle: 'italic'
    },
    fundo: {
        backgroundColor: '#f0f0f0df',
        minHeight: '100vh'
    },
    conteudo: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: 24
    },
    lista_aulas: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    cardAula: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '100%',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.18)'
    }
}

