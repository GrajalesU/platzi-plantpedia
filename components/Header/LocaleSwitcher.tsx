import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const LocaleSwitcher = ({ className = '' }: { className?: string }) => {
  const { locale, asPath: currentPath } = useRouter()
  const { t } = useTranslation(['common'])

  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex gap-2  right-1 mr-6">
        {t('language')}:
        {locale === 'en-US' ? (
          <span style={{ cursor: 'default' }} className={className}>
            <NextLink passHref href={currentPath} locale="es">
              <Typography
                variant="body1"
                component="span"
                className="w-6 text-center"
              >
                Es
              </Typography>
            </NextLink>
            <span className="border-l border-gray-300" />
            <Typography
              component="span"
              variant="body1"
              className=" bg-gray-300 rounded-md font-bold w-6 text-center"
            >
              En
            </Typography>
          </span>
        ) : (
          <span style={{ cursor: 'default' }} className={className}>
            <Typography
              component="span"
              variant="body1"
              className=" bg-gray-300 rounded-md font-bold w-6 text-center"
            >
              Es
            </Typography>
            <span className="border-l border-gray-300" />
            <NextLink passHref href={currentPath} locale="en-US">
              <Typography
                variant="body1"
                component="span"
                className="w-6 text-center"
              >
                En
              </Typography>
            </NextLink>
          </span>
        )}
      </div>
    </div>
  )
}

export default LocaleSwitcher
