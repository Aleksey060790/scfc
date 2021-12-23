import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GitCard from './GitCard';

export default function CardPage() {

  const { background, text, icon, user, repository } = useParams<{
    background: string; 
    text: string; 
    icon: string; 
    user: string; 
    repository: string;
  }>();

  const [loadingRepo, setLoadingRepo] = useState(true);
  const [repositoryObj, setRepositoryObj] = useState<any>();

  useEffect(() => {
    fetch(`https://api.github.com/repos/${user}/${repository}`)
      .then(res => res.json())
      .then(res => {
        setRepositoryObj(res);
        setLoadingRepo(false);
      })
  }, [user, repository])
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      position="absolute"
    >
    { loadingRepo
      ? <CircularProgress />
      : <GitCard
        selectedBackgroundColor={background}
        selectedTextColor={text}
        selectedRepository={repositoryObj}
        selectedIcon={icon}
      />
    }
    </Box>
  )
}
