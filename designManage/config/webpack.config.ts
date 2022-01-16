import { defineConfig } from 'umi'
import path from 'path'

const resolve = (p: string) => path.resolve(__dirname, p)

export const __DEV__ = process.env.API_ENV !== 'test'

export const MOCK_URL = 'http://192.168.180.58/mock/{projectId}/api'

const SERVER_URL =
  process.env.API_ENV === 'test' ? 'http://localhost:8000' : 'http://localhost:8000'

export default {
  alias: {
    config: resolve('../config')
  },
  proxy: {
    '/api': {
      target: SERVER_URL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  chainWebpack(memo) {
    memo.module.rules.delete('svg')

    memo.module
      .rule('svg')
      .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
      .use('@svgr/webpack')
      .loader(require.resolve('@svgr/webpack'))

    memo.optimization.splitChunks({
      cacheGroups: {
        echarts: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/](echarts)[\\/]/,
          priority: 40
        },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](moment|antd|@ant-design)[\\/]/,
          priority: 20
        },
        vendor: {
          name: 'vendors',
          test({ resource }: any) {
            return /[\\/]node_modules[\\/]/.test(resource)
          },
          priority: 10
        }
      }
    })
  }
}
