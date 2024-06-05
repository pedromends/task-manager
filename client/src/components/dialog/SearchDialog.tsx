import { useState } from 'react';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import algoliasearch from 'algoliasearch/lite';
import './SearchDialog.css'

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {

  const { onClose, selectedValue, open } = props;
  const [searchClient, setSearchClient] = useState(algoliasearch('QX7MGM2ZGN','7e610843ca2e4c9cafcfd88567fed682'))
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const Hit = ({hit}: {hit:any}) => {
    return (
      <div>
        <h2>
          <Highlight attribute="title" hit={hit}></Highlight>
        </h2>
        <div style={{display:'flex', gap: '3rem', color:'rgba(240,247,247,1)'}}>
          <p>{hit.titulo}</p>
          <p>{hit.descricao}</p>
        </div>
      </div>
    )
  }

  return (
    <Dialog onClose={handleClose} open={open} sx={{backgroundColor: 'transparent'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#006666', paddingTop: '3rem', paddingLeft: '3rem', paddingRight: '3rem'}}>
          <h1 style={{display: 'flex', flexDirection: 'column', textAlign: 'center', color: 'rgba(240,247,247,1)'}}>
            Pesquisa Avançada
            <span style={{fontSize: '10px', textAlign: 'right', display: 'flex', alignItems: 'center', alignSelf: 'end'}}>Powered by 
              <img src="./assets/algolia.svg" style={{width: '4rem', marginLeft: '1rem'}} alt="" />
            </span>
            </h1>
					<div>
            <InstantSearch searchClient={searchClient} indexName='task-manager'>
              <SearchBox searchAsYouType ></SearchBox>
              <Hits hitComponent={Hit}></Hits>
            </InstantSearch>
          </div>
				</div>
    </Dialog>
  );
}

export default function SearchDialog() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{backgroundColor:'#006666', ":hover":{backgroundColor:'white', color: '#006666'}, color: 'white'}}>
        Pesquisa Avançada
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
