import React, { useEffect, useState } from 'react'
import { Avatar, Box, Card, CardContent, CardMedia, makeStyles, Theme, Typography } from '@material-ui/core'
import GitHubButton from 'react-github-btn'
import IconSet from "../assets";
import { ColorValue } from 'material-ui-color';

interface GitCardProps {
  selectedBackgroundColor: ColorValue;
  selectedTextColor: ColorValue;
  selectedIcon: string;
  selectedRepository: any;
}

export default function GitCard({
  selectedBackgroundColor,
  selectedTextColor,
  selectedIcon,
  selectedRepository
}: GitCardProps) {
  const styles = makeStyles((theme: Theme) => ({
    iconButtonWithPrimaryBorder: {
      border: `1px solid ${theme.palette.primary.main}`
    },
    iconButtonWithWhiteBorder: {
      border: `1px solid #fff`
    },
    root: {
      maxWidth: 500,
      position: 'relative'
    },
    icon: {
      height: 200,
      width: 200,
      position: 'absolute',
      top: 25,
      left: 150,
      border: '2px solid #fff',
      borderRadius: '50%',
      backgroundColor: '#fff'
    },
    cover: {
      height: 150,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(to top, #fff, #${selectedBackgroundColor})`,
      color: `#${selectedTextColor}`,
      paddingTop: 100
    },
    links: {
      color: 'inherit',
      textDecoration: 'none'
    },
    marginRight: {
      marginRight: 10
    }
  }))();
  const [contributors, setContributors] = useState<any[]>([]);

  const icons: any = IconSet;

  useEffect(() => {
    fetch(selectedRepository.contributors_url)
      .then(res => res.json())
      .then(res => setContributors(res))
  }, [selectedRepository])

  return (
    <Card className={styles.root}>
      <CardMedia className={styles.cover} component="div" />
      <CardMedia
        classes={{ root: styles.icon }}
        image={icons[selectedIcon]}
      />
      <div className={styles.details}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography component="h5" variant="h5" className={styles.marginRight}>
              <a
                className={styles.links}
                target="_blank"
                rel="noreferrer"
                href={selectedRepository.html_url}>{selectedRepository.name}
              </a>
            </Typography>
            <GitHubButton
              href={selectedRepository.html_url}
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true">Star
            </GitHubButton>
          </Box>
        <Typography variant="subtitle1" align="center">
          <a
            className={styles.links}
            target="_blank"
            rel="noreferrer"
            href={selectedRepository.owner.html_url}>@{selectedRepository.owner.login}
          </a>
        </Typography>
        <Typography variant="subtitle2" align="center">
          {selectedRepository.description}
        </Typography>
      </CardContent>
        <Box display="flex" flexWrap="wrap" justifyContent="center" pt={3}>
          {
            contributors.slice(0, 5).map((contributor, index) => <Box key={index} m={1}>
              <a href={contributor.html_url}>
                <Avatar alt={contributor.login} src={contributor.avatar_url} />
              </a>
            </Box>)
          }
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="center" pb={3}>
          {
            contributors.slice(5, 10).map((contributor, index) => <Box key={index} m={1}>
              <a href={contributor.html_url}>
                <Avatar alt={contributor.login} src={contributor.avatar_url} />
              </a>
            </Box>)
          }
        </Box>
      </div>
    </Card>
  )
}
