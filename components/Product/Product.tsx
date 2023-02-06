import {
  useState,
  useRef,
  forwardRef,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ForwardedRef,
} from "react";
import Image from "next/image";
import cn from "classnames";
import { motion } from "framer-motion";

import { Card } from "../Card/Card";
import { declOfNum, priceRu } from "../../helpers/helpers";
import { ProductModel } from "../../types/product.interface";
import { Rating } from "../Rating/Rating";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Review } from "../Review/Review";
import { Tag } from "../Tag/Tag";
import { ReviewForm } from "../ReviewForm/ReviewForm";

import styles from "./Product.module.css";

export interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      return (
        <div ref={ref} className={className} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category, idx) => (
                <Tag key={idx} className={styles.category} color="ghost">
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div className={styles.characteristics} key={c.name}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button variant="primary">Узнать подробнее</Button>
              <Button
                variant="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? "visible" : "hidden"}
            variants={variants}
            initial="hidden"
          >
            <Card color="blue" className={styles.reviews} ref={reviewRef}>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <Review review={review} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
