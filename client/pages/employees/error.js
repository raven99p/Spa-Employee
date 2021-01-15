import Link from 'next/link';
import { Typography } from 'antd';
const { Title, Paragraph} = Typography;
export default function PageError(){
	return(
		<div>
			<Title>ERROR</Title>
				<Paragraph>
                    If you are here, it means our Database is long gone.. for now.<br/>
                    Please visit us another time.<br/>
                    Thank you for your understanding.
				</Paragraph>
			<Link href="/">
            	<a> ← Back to home</a>
          	</Link>
		</div>
	)
}