import { motion } from 'framer-motion'
import './MeaningSection.css'

const letters = [
  { l: 'ب', text: 'بداية جميلة مرتبطة بذكر اسم الله' },
  { l: 'س', text: 'سعادة وطمأنينة في كل لحظة' },
  { l: 'م', text: 'معنى جميل وروح هادئة ومميزة' },
  { l: 'ل', text: 'لطف ومحبة في حضورها' },
  { l: 'ة', text: 'اسم مميز له وقع جميل في القلب' },
]

export default function MeaningSection() {
  return (
    <section className="meaning-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">بسملة ♥</span>
        <h2 className="section-title">معنى اسم بسملة</h2>
        <p className="section-subtitle">
          اسم «بسملة» مرتبط بكلمة «البسملة»، أي قول: بسم الله الرحمن الرحيم،
          وهي عبارة جميلة تُقال لبدء الأمور بذكر الله. ♥
        </p>
      </motion.div>

      <div className="meaning-grid">
        {letters.map((item, i) => (
          <motion.div
            key={i}
            className="meaning-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <span className="meaning-letter">{item.l}</span>
            <span className="meaning-text">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
