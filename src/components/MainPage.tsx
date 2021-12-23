import { Box, Button, CircularProgress, ClickAwayListener, Divider, IconButton, makeStyles, TextField, Theme, Tooltip, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconSet from "../assets";
import { ColorBox, ColorValue } from 'material-ui-color';
import { FormatColorTextRounded, FormatColorFillRounded, FileCopyRounded } from '@material-ui/icons';
import GitCard from './GitCard';

export default function MainPage() {
  const [username, setUsername] = useState('');
  const [tooltip, setTooltip] = useState(false);
  const [reposLoaded, setReposLoaded] = useState(false);
  const [reposLoading, setReposLoading] = useState(false);
  const [allRepos, setAllRepos] = useState<any[]>([]);
  const [selectedRepository, setSelectedRepository] = useState<any>();
  const [selectedIcon, setSelectedIcon] = useState<any>();
  const [selectedTextColor, setSelectedTextColor] = useState<ColorValue>('000');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<ColorValue>('000');
  const icons: any = IconSet;
  const styles = makeStyles((theme: Theme) => ({
    iconButtonWithPrimaryBorder: {
      border: `1px solid ${theme.palette.primary.main}`
    },
    iconButtonWithWhiteBorder: {
      border: `1px solid #fff`
    },
    marginRight: {
      marginRight: 10
    }
  }))();

  const getAllRepos = () => {
    setReposLoading(true);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(res => {
        setAllRepos(res);
        setReposLoaded(true);
        setReposLoading(false);
      });
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://my-git-card.herokuapp.com/${selectedBackgroundColor}/${selectedTextColor}/${selectedIcon}/${username}/${selectedRepository.name}`
    ).then(res => setTooltip(true));
  }

  return (
    <Box justifyContent="center" display="flex" p={4}>
      {
        selectedRepository && selectedIcon && <Box width="50%">
          <Typography variant="h2">Card Preview</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" my={5} position="sticky" top="30px">
            <GitCard
              selectedBackgroundColor={selectedBackgroundColor}
              selectedTextColor={selectedTextColor}
              selectedIcon={selectedIcon}
              selectedRepository={selectedRepository}
            />
            <Box mt={2} display="flex" alignItems="center">
              <Typography color="secondary">
                {`https://my-git-card.herokuapp.com/${selectedBackgroundColor}/${selectedTextColor}/${selectedIcon}/${username}/${selectedRepository.name}`}
              </Typography>
              <ClickAwayListener onClickAway={() => setTooltip(false)}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setTooltip(false)}
                    open={tooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied to Clipboard"
                  >
                    <IconButton color="primary" onClick={handleCopyLink}>
                      <FileCopyRounded />
                    </IconButton>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </Box>
          </Box>
        </Box>
      }

      <Box width="50%">
        <Typography variant="h2">Create your custom card</Typography>
        <Box mt={5} mb={3}>
          <Typography
            variant="h5"
            gutterBottom
          >Enter your username</Typography>
          <TextField
            size="medium"
            label="Username"
            variant="outlined"
            placeholder="Enter Github username"
            onChange={event => setUsername(event.target.value)}
          />

          <Box my={1}>
            {reposLoading
              ? <CircularProgress size={30} />
              : <Button
                onClick={getAllRepos}
                color="default"
                variant="outlined"
              >Get Repos</Button>
            }
          </Box>
        </Box>

        {reposLoaded && (
          <Box my={3}>
            {allRepos.length
              ? <div>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Select your Repository
                </Typography>

                <Autocomplete
                  size="small"
                  options={allRepos}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={option => option.id === selectedRepository?.id}
                  style={{ width: 300 }}
                  onChange={(event, value) => setSelectedRepository(value)}
                  renderInput={(params) => <TextField
                    {...params}
                    label="Repository"
                    variant="outlined"
                    placeholder="Search Repository name"
                  />}
                />
              </div>
              : <Typography
                color="textSecondary"
                variant="subtitle1"
                align="center"
              >No public repositories found</Typography>
            }
          </Box>
        )}

        {
          selectedRepository && (
            <Box my={3}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Select an Icon
              </Typography>
              <Box>
                {
                  Object.keys(IconSet).map((icon: any, index) => (<Box key={index} m={1} display="inline">
                    <IconButton
                      className={selectedIcon === icon
                        ? styles.iconButtonWithPrimaryBorder
                        : styles.iconButtonWithWhiteBorder}
                      onClick={() => setSelectedIcon(icon)}
                    >
                      <img src={icons[icon]} alt={icon} />
                    </IconButton>
                  </Box>
                  ))
                }
              </Box>
            </Box>
          )
        }

        {
          selectedRepository && selectedIcon && (
            <Box my={2}>
              <Box my={2}>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Select Colors
                </Typography>
              </Box>

              <Box display="flex">
                <Box m={2}>
                  <Box px={2} display="flex" alignItems="center" justifyContent="space-between">
                    <FormatColorTextRounded />
                    <Typography variant="h6">Text Color</Typography>
                  </Box>

                  <ColorBox
                    key="text"
                    value={`#${selectedTextColor}`}
                    onChange={event => setSelectedTextColor(`${event.hex}`)}
                  />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box m={2}>
                  <Box px={1} display="flex" alignItems="center" justifyContent="space-between">
                    <FormatColorFillRounded />
                    <Typography variant="h6">Background Color</Typography>
                  </Box>

                  <ColorBox
                    key="background"
                    value={`#${selectedBackgroundColor}`}
                    onChange={event => setSelectedBackgroundColor(`${event.hex}`)}
                  />
                </Box>
              </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}
