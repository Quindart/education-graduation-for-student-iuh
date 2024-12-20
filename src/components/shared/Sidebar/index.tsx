import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { APP_SIDEBAR } from '@/utils/app-config';
import useTermStore from '@/store/termStore';
import useSidebarStore from '@/store/ui/sidebarStore';
import TitleManager from '@/components/ui/Title';
import { keyframes } from '@emotion/react';

const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';
const screen_mobile = 900;

const opacity__animations_out = keyframes`
  0% {
   transform: translateX(0); 
  }
  100% {
      transform: translateX(0); 
  }
`;

const opacity__animations_in = keyframes`
  0% {
   transform: translateX('0px'); 
  }
  100% {
    transform: translateX(0); 
  }
`;
const AdminSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { term } = useTermStore();

  const location = useLocation();

  const [activeItemIndexes, setActiveItemIndexes] = useState<number[]>([]);
  const [currentSidebarItemIndex, setCurrentSidebarItemIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < screen_mobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screen_mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItemIndexes([homePageIndex]);
      setCurrentSidebarItemIndex(homePageIndex);
      return;
    }
    APP_SIDEBAR.forEach((item: any, itemIndex: number) => {
      if (item.children) {
        item.children.forEach((subItem: any) => {
          if (location.pathname.includes(subItem.link)) {
            setActiveItemIndexes([itemIndex]);
            setCurrentSidebarItemIndex(itemIndex);
          }
        });
        return;
      }
      if (location.pathname.includes(item.link)) {
        setActiveItemIndexes([itemIndex]);
        setCurrentSidebarItemIndex(itemIndex);
      }
    });
  }, [location.pathname]);
  useEffect(() => {
    if (isOpen === true) {
      setActiveItemIndexes([]);
    }
  }, [isOpen]);
  const handleClickSidebarItem = (indexNumber: number) => {
    if (activeItemIndexes.includes(indexNumber)) {
      setActiveItemIndexes(activeItemIndexes.filter((number: number) => number !== indexNumber));
    } else {
      setActiveItemIndexes([...activeItemIndexes, indexNumber]);
    }
  };

  return (
    <Box
      sx={{
        width: isOpen ? drawerWidth : hidedDrawerWidth,
        animation: `${isOpen ? opacity__animations_in : opacity__animations_out}  0.2s ease-in`,
        transition: 'width 0.4s ease forwards',
        opacity: 1,
        maxHeight: '100vh',
        height: '100%',
        position: 'fixed',
        bgcolor: 'primary.dark',
        zIndex: 1000,
        top: 0,
        borderRight: '1px solid #cddef8',
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      {isOpen ? (
        <>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            textTransform={'uppercase'}
            flexDirection={'column'}
            sx={{
              transition: '0.3s all ease',
              transform: isOpen ? 'translateX(0)' : 'translateX(-100px)',
              opacity: isOpen ? 1 : 0,
            }}
            borderBottom={'0px solid #1467db'}
            height={240}
          >
            <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img width={100} src='/images/logo-IUH-ngang-trang-300x131-1.webp' />
              <Typography
                textAlign={'center'}
                variant='body1'
                color={'grey.100'}
                fontWeight={400}
                mt={10}
                sx={{
                  opacity: 0.7,
                }}
              >
                Danh mục quản lý
              </Typography>
              <Box sx={{ my: 10 }}>
                <TitleManager mb={10} color={'#8cb9de'} fontWeight={700} textAlign={'center'}>
                  Khóa luận tốt nghiệp
                </TitleManager>
                <TitleManager mb={10} color={'grey.300'} fontWeight={400} textAlign={'center'}>
                  {term.name}
                </TitleManager>
              </Box>
            </Box>
          </Box>
          <Drawer
            variant={'permanent'}
            open={isOpen}
            onClose={toggleSidebar}
            sx={{
              flexShrink: 0,
              height: 'calc(100% - 200px)',
              ['& .MuiDrawer-paper']: {
                width: '100%',
                border: 'none',
                height: 'calc(100%)',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                overflowY: 'hidden',
                display: 'flex',
                position: 'revert',
                flexDirection: 'column',
                bgcolor: 'primary.dark',
                transition: 'all 0.2s',
                '&:hover': {
                  overflowY: 'auto',
                },
                '&::-webkit-scrollbar': {
                  width: 4,
                },

                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'grey.700',
                },
                '.Mui-expanded ': {
                  margin: 0,
                },
                '& .MuiTypography-root': {
                  color: 'grey.400',

                  overFlow: 'hidden',
                  '&.active': {
                    fontWeight: 600,
                    color: 'grey.400',

                    '& svg': {
                      color: 'grey.400',
                    },
                    '&:hover': {
                      fontSize: 'body2',
                    },
                  },
                },
              },
            }}
          >
            {APP_SIDEBAR.map((item: any, itemIndex: number) => (
              <>
                <Accordion
                  expanded={activeItemIndexes.includes(itemIndex)}
                  onChange={() => handleClickSidebarItem(itemIndex)}
                  key={itemIndex}
                  title={item.text}
                  onClick={() => {
                    if (!item.children) navigate(item.link);
                  }}
                  sx={{
                    bgcolor: 'primary.dark',
                    boxShadow: 'none',
                    mx: !isOpen ? 'auto!important' : '',
                    mt: !isOpen ? '4px!important' : '',
                    '&::before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                    expandIcon={
                      <>
                        {item.children && isOpen && (
                          <Icon width={20} height={20} icon='ic:outline-keyboard-arrow-down' />
                        )}
                      </>
                    }
                    sx={{
                      overflow: 'hidden',
                      height: 50,
                      px: 10,
                      '&.Mui-expanded': {
                        minHeight: 0,
                      },

                      '&:hover': {
                        bgcolor: '#0d5db6',
                        transform: 'scale(1.02)',
                        transition: '0.2s all ease-in',
                        '.MuiTypography-root': {
                          color: 'grey.400',
                        },
                        '& .MuiAccordionSummary-content': {
                          '& svg': {
                            color: 'grey.400',
                          },
                        },
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                      '& svg': {
                        color: 'grey.400',
                      },
                      '&.active': {
                        color: '#0859db',
                        bgcolor: '#06275c',
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                    }}
                  >
                    <Box
                      display='flex'
                      alignItems='flex-start'
                      justifyContent='left'
                      marginLeft={isOpen ? 0 : 4}
                      className={`${item.key && location.pathname.endsWith(item.key) ? 'active' : ''}`}
                      gap={4}
                      onClick={() => {
                        if (item.children) return;
                        navigate(item.link);
                      }}
                    >
                      <Icon onClick={toggleSidebar} icon={item.icon} width={20} height={20} />
                      <Typography
                        variant='body1'
                        fontWeight={400}
                        sx={{
                          flex: 1,
                          textWrap: 'nowrap',
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  {item?.children && isOpen && (
                    <AccordionDetails
                      sx={{
                        paddingY: 4,
                        cursor: 'pointer',
                        bgcolor: '#065693',
                      }}
                    >
                      {isOpen &&
                        item?.children?.map((submenuItem: any, submenuItemIndex: number) => (
                          <Box
                            display='flex'
                            alignItems='center'
                            gap={1}
                            sx={{
                              position: 'relative',
                              '::after': {
                                content: '""',
                                position: 'absolute',
                                // width: 4,
                                // height: 2,
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                transition: '0.3s all',
                              },
                              borderRadius: 2,
                              '&:hover': {
                                bgcolor: 'rgba(15, 124, 249, 0.4)',
                                transform: 'scale(1.02)',
                                transition: '0.2s all ease-in',
                                '& .MuiTypography-root': {
                                  color: 'grey.400',
                                },
                              },
                            }}
                          >
                            <Typography
                              variant='body1'
                              component='span'
                              sx={{
                                flex: 1,
                                pl: 10,
                                py: 6,
                                textWrap: 'nowrap',
                                '&.active': {
                                  bgcolor: 'rgba(15, 124, 249, 0.8)',
                                  borderRadius: 2,
                                  '& svg': {
                                    color: '#0d5db6',
                                  },
                                },
                              }}
                              key={submenuItemIndex}
                              className={`${location.pathname.endsWith(submenuItem.key) ? 'active' : ''}`}
                              onClick={() => {
                                navigate(submenuItem.link);
                              }}
                            >
                              - {submenuItem.text}
                            </Typography>
                          </Box>
                        ))}
                    </AccordionDetails>
                  )}
                </Accordion>
              </>
            ))}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant={'permanent'}
          open={isOpen}
          onClose={toggleSidebar}
          sx={{
            flexShrink: 0,
            mt: 70,
            height: 'calc(100% - 200px)',
            ['& .MuiDrawer-paper']: {
              width: '100%',
              border: 'none',
              height: 'calc(100%)',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              overflowY: 'hidden',
              display: 'flex',
              position: 'revert',
              flexDirection: 'column',
              bgcolor: 'primary.dark',
              transition: 'all 0.2s',
              '&:hover': {
                overflowY: 'auto',
              },
              '&::-webkit-scrollbar': {
                width: 4,
              },

              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'grey.700',
              },
              '.Mui-expanded ': {
                margin: 0,
              },
              '& .MuiTypography-root': {
                color: 'grey.400',

                overFlow: 'hidden',
                '&.active': {
                  fontWeight: 500,
                  color: 'grey.400',

                  '& svg': {
                    color: 'grey.400',
                  },
                  '&:hover': {
                    fontSize: 'body2',
                  },
                },
              },
            },
          }}
        >
          {APP_SIDEBAR.map((item: any, itemIndex: number) => (
            <>
              <Accordion
                expanded={activeItemIndexes.includes(itemIndex)}
                onChange={() => handleClickSidebarItem(itemIndex)}
                key={itemIndex}
                onClick={() => {
                  if (!item.children) navigate(item.link);
                  else navigate(item.children[0].link);
                  toggleSidebar();
                }}
                sx={{
                  bgcolor: 'primary.dark',
                  boxShadow: 'none',
                  '&::before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 50,
                    '&.Mui-expanded': {
                      minHeight: 0,
                    },
                    '&:hover': {
                      bgcolor: '#0d5db6',
                      transform: 'scale(1.2)',
                      transition: '0.2s all ease-in',
                      '.MuiTypography-root': {
                        color: 'grey.400',
                      },
                      '& .MuiAccordionSummary-content': {
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      '& svg': {
                        color: 'grey.400',
                      },
                    },
                    '& svg': {
                      color: 'grey.400',
                    },
                    '&.active': {
                      color: '#0859db',
                      bgcolor: '#06275c',
                      '& svg': {
                        color: 'grey.400',
                      },
                    },
                  }}
                >
                  <Box
                    display='flex'
                    pl={12}
                    alignItems={'center'}
                    justifyContent='center'
                    className={`${item.key && location.pathname.endsWith(item.key) ? 'active' : ''}`}
                    gap={4}
                  >
                    <Icon icon={item.icon} width={20} height={20} />
                  </Box>
                </AccordionSummary>
              </Accordion>
            </>
          ))}
        </Drawer>
      )}
    </Box>
  );
};

export default React.memo(AdminSidebar);
