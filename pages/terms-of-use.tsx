import styled from 'styled-components';
import Seo from '../components/Seo';
import { appUrl, siteInfo } from '../utils/config';
import TotymIconNameTagline from '../components/svgs/TotymIconNameTagline';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem auto;
  width: 90%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 800px;
  }

  p {
    margin-bottom: 1rem;
  }

  .firstParagraph {
    text-indent: 3rem;
  }
  .notice {
    color: red;
    font-weight: bold;
  }
  ol {
    padding: 0.5rem 1rem;
  }
  ol > li {
    list-style-type: number;
    margin-top: 1rem;
    padding-left: 1rem;
  }

  ol > li > span {
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .lowerAlphaList {
    li {
      font-size: 0.9rem;
      font-weight: initial;
      list-style-type: lower-alpha;
      margin-left: 1.25rem;
      margin-top: 0.25rem;
    }
  }
`;
const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 500;
  margin: 1rem auto;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  margin-top: 20px;
`;

export default function TermsOfUsePage(props) {
  return (
    <>
      <Seo
        author="Totym Inc."
        description=""
        title="Totym Inc. Terms of Use"
        image={siteInfo.image}
        url={`${appUrl}/terms-of-use`}
      />
      <MainContainer>
        <TotymIconNameTagline />

        <Title>Totym Beta Participant Agreement</Title>
        <p className="firstParagraph">
          This Beta Participant Agreement (“Agreement”) constitutes a legal
          agreement between you and Totym, Inc. (“Totym”) and governs your use
          of Totym’s websites, platform and services (the “Services”). Your
          continued use of the Services constitutes your acceptance of this
          Agreement.
        </p>
        <p className="notice">
          BETA NOTICE: Your use of the Services will be a BETA version of the
          Services and may have serious bugs, which may cause damage to your
          data. It is intended for beta use only and must not be used in a
          production environment.
        </p>
        <ol>
          <li>
            <span>License</span>
          </li>
          <ol className="lowerAlphaList">
            <li>
              Subject to your strict compliance with the terms of this
              Agreement, Totym grants you a royalty-free, limited,
              non-exclusive, non-transferable, non-assignable, revocable license
              to use the BETA version of the Services. You may not disclose or
              share the Services to anyone that is not also directly licensed by
              Totym to use the BETA version of the Services.
            </li>
            <li>
              All rights not expressly granted herein are reserved to Totym.
            </li>
            <li>
              Participant grants to Totym a royalty-free, limited,
              non-exclusive, non-transferable, non-assignable license to process
              all data, including without limitation, your personal information,
              Your Content (defined below), preferences and use data (Beta Data)
              collected through your use of the BETA version of the Services for
              the purpose of the development of the Services. “Your content”
              means pictures, videos, music, lyrics and text you upload to or
              through the Services.
            </li>
          </ol>
          <li>
            <span>Restrictions</span>
          </li>
          <ol className="lowerAlphaList">
            <li>
              You agree not to: make any copies of the Services, in whole or in
              part; interfere or disrupt networks connected to any services
              provided by or through Totym; use the Services for any purpose
              competitive with Totym; use the Services to create any service or
              software similar to the Services or any service provided by Totym;
              use the Services to infringe the privacy or intellectual property
              rights of Totym or a third party; disassemble, decompile, reverse
              engineer or use any other means to attempt to discover any source
              code of the Services, or the underlying ideas, algorithms or trade
              secrets therein; encumber, sublicense, transfer, rent, lease,
              timeshare, or use the Services in any service bureau arrangement
              or otherwise for the benefit of any third party; use or allow the
              transmission, transfer, export, re-export or other transfer of any
              product, technology or information it obtains or learns pursuant
              to this Agreement (or any direct product thereof) in violation of
              any export control or other laws and regulations of the United
              States or any other relevant jurisdiction; use the Services to
              distribute or transmit any file that contains malware; attempt to
              gain unauthorized access to the Services or any other computer
              system; use the Services to transmit any unlawful, harassing,
              libelous, defamatory, racist, indecent, abusive, violent,
              threatening, intimidating, harmful, vulgar, obscene, offensive or
              otherwise objectionable material of any kind or nature; or permit
              any third party to engage in any of the foregoing proscribed acts.
            </li>
            <li>
              Any feedback, ideas, modifications, suggestions, improvements, and
              the like made by you with respect to the Services (collectively,
              “Feedback”) will be the sole and exclusive property of Totym. You
              agree to assign, and hereby do assign, all right, title, and
              interest worldwide in the Feedback and the related intellectual
              property rights to Totym and agree to assist Totym, at Totym’s
              expense, in perfecting and enforcing such rights. Totym may
              disclose or use Feedback for any purposes whatsoever without any
              obligation to you.
            </li>
          </ol>
          <li>
            <span>Privacy.</span>Totym will not sell your Personal Data (defined
            below). Totym will use your Personal Data for the purpose of testing
            the BETA version of the Services, and improving and developing the
            Services, which will include the sharing of your Personal Data with
            third-party service providers.{' '}
          </li>
          <li>
            <span>Confidentiality</span>
          </li>
          <ol className="lowerAlphaList">
            <li>
              You acknowledge that as a beta tester, you may have access to, and
              Totym may disclose to you, certain valuable information belonging
              to and relating to Totym which is confidential information
              belonging to Totym. Totym’s “Confidential Information” includes,
              but is not limited to, all material, information, data and other
              communications by or between Totym or you, regardless of the form
              or medium in which such information is disclosed, including, but
              not limited to information concerning the Services and Feedback;
              any technology (including without limitation, software and
              hardware) used or to be used as part of or to utilize the
              Services, including without limitation, any drawings, schematics
              or products, and all related documentation; network configurations
              and network architecture, input materials and output materials,
              the media upon which they are located, and all software programs
              or packages related to or associated with the Services, issues and
              bugs you experience using the Services (together with any related
              documentation, source code or codes, object code or codes,
              upgrades, revisions, modifications and any related materials); all
              derivative works; operational information; communications about
              the Services, any comments you may have about the Services,
              Totym’s trademark(s) and trade name(s), user manuals, sales and
              marketing plans, business plans, processes, customer lists, and
              other trade secrets (“Confidential Information”). You shall use
              the Confidential Information solely for testing purposes and shall
              not disclose, without Totym’s written consent, such Confidential
              Information to third parties or use such Confidential Information
              for its own benefit or for the benefit of third parties.
            </li>
            <li>
              This Agreement shall impose no obligation of confidentiality upon
              you with respect to any portion of the Confidential Information
              which: (i) now or hereafter, through no act or failure to act on
              your part, becomes generally known or available; (ii) is known to
              you at the time you receive same from Totym as evidenced by
              written records; (iii) is hereafter furnished to you by a third
              party as a matter of right and without restriction on disclosure.
            </li>
          </ol>
          <li>
            <span>
              Proprietary Rights; No Right to Copy, Modify, or Disassemble.
            </span>
          </li>
          <ol className="lowerAlphaList">
            <li>
              The BETA version of the Services is being licensed, not sold. The
              Services provided by Totym, all Confidential Information, and all
              derivative works, and all copies thereof, are proprietary to and
              the property of Totym. All applicable rights in all copyrights,
              trademarks, trade secrets, trade names, patents and other
              intellectual property rights in or associated with the Services
              are and will remain in Totym and you shall have no such
              intellectual property rights in the Services.
            </li>
          </ol>
          <li>
            <span>Data.</span>Totym collects and uses “Beta Data” (defined
            below) and “Personal Data” (defined below) it collects in accordance
            with its privacy policies and in compliance with applicable data
            protection laws. As between Totym and Customer, Beta Data (i) is
            Confidential Information of Totym; and (ii) may include personally
            identifiable information about a person (“Personal Data”). Totym may
            utilize data capture, syndication, and analysis tools, and other
            similar tools, to extract, compile, synthesize, and analyze any
            aggregate data, including, non-personally identifiable data or any
            other non-identifiable data or information, resulting from your use
            of the Services (“Statistical Data”). Totym may use Statistical Data
            without a duty of accounting to you or restriction. “Beta Data”
            means all data and information created, received, processed or
            provided by Totym related to the Services and this Agreement or
            Participant’s usage of the Services or performance of its
            obligations or rights under this Agreement.
          </li>
          <li>
            <span>Disclaimer of Warranty; Assumption of Risk.</span>By its
            nature, the BETA version of the Services may contain errors, bugs
            and other problems that could cause system failure and the testing
            and quality assurance of the Beta Test Material may not yet be
            completed. Because the BETA version of the Services is subject to
            change, Totym reserves the right to alter the BETA version of the
            Services at any time, and any reliance on the BETA version of the
            Services is at Participant’s own risk. PARTICIPANT ACCEPTS THE BETA
            VERSION OF THE SERVICES “AS IS.” TOTYM MAKES NO WARRANTY OF ANY KIND
            REGARDING THE SERVICES. TOTYM HEREBY EXPRESSLY DISCLAIMS ALL IMPLIED
            AND STATUTORY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED
            WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
            NON-INFRINGEMENT OF THIRD PARTIES RIGHTS.
          </li>
          <li>
            <span>Term and Termination.</span>
          </li>
          <ol className="lowerAlphaList">
            <li>
              The term of this Agreement shall begin upon your use of the
              Services, including without limitation, the completion of any
              registration related forms and shall continue until terminated by
              Totym. Upon termination of this Agreement for any reason, the
              obligation to protect Confidential Information, as set forth in
              Section 4, shall survive such termination.
            </li>
            <li>
              This Agreement may be terminated at any time for any reason by
              either party giving written notice to the other party. This
              Agreement will automatically terminate upon the general release to
              the public of the Services, unless terminated earlier.
            </li>
          </ol>
          <li>
            <span>Limitation of Liability.</span>IN NO EVENT SHALL TOTYM BE
            LIABLE TO YOU OR ANY THIRD PARTY FOR ANY GENERAL, INCIDENTAL,
            CONSEQUENTIAL, INDIRECT, DIRECT, SPECIAL, OR PUNITIVE DAMAGES,
            ARISING OUT OF OR RELATING TO THE BETA TEST MATERIAL OR THE
            TRANSACTIONS CONTEMPLATED HEREIN.
          </li>
          <li>
            <span>Indemnification</span>You agree to defend, indemnify and hold
            harmless Totym, it officers, directors, shareholders, employees,
            agents, affiliates, parent and subsidiary companies against any and
            all costs, claims, damages or expenses incurred (and reasonable
            attorneys’ fees in connection therewith), as well as amounts finally
            awarded in a settlement or by a court, arising from or related to
            any third party claim or allegation relating to or arising out of
            any violation of a third party’s intellectual property rights
            related to or arising out of Your Content.
          </li>
          <li>
            <span>Waiver.</span>No change, consent or waiver under this
            Agreement will be effective unless in writing and signed by the
            party against which enforcement is sought. The failure of a party to
            enforce its rights under this Agreement at any time for any period
            will not be construed as a waiver of such rights, and the exercise
            of one right or remedy will not be deemed a waiver of any other
            right or remedy.
          </li>
          <li>
            <span>Assignment.</span>You agree to not to assign any rights under
            this Agreement; any attempted assignment shall be null and void and
            shall result in the termination of this Agreement. If any part of
            this Agreement shall be invalid or unenforceable, such invalidity or
            unenforceability shall not affect the validity or enforceability of
            any other part or provision of this Agreement which shall remain in
            full force and effect.
          </li>
          <li>
            <span>Severability.</span>If any part of this Agreement shall be
            invalid or unenforceable, that part shall be revised in a manner
            that reflects the parties’ original intent and in a manner that is
            valid and enforceable.
          </li>
          <li>
            <span>Governing Law.</span>TThis Agreement shall be governed by and
            construed in accordance with the laws of the State of Michigan,
            without regard to its conflicts of law provisions. Exclusive
            jurisdiction and venue for actions related to this Agreement will be
            the state or federal courts located in Michigan having jurisdiction
            over Totym's offices, and both parties consent to the jurisdiction
            of such courts with respect to any such action. In any action or
            proceeding to enforce this Agreement, the prevailing party will be
            entitled to recover from the other party its costs and expenses
            (including reasonable attorneys' fees) incurred in connection with
            such action or proceeding and enforcing any judgment or order
            obtained. All proceedings will be conducted in English.
          </li>
          <li>
            <span>Entire Agreement.</span>This Agreement constitutes the entire
            agreement, and supersedes all prior negotiations, understandings or
            agreements (oral or written), between the parties regarding the
            subject matter of this Agreement (and all past dealing or industry
            custom).
          </li>
        </ol>
      </MainContainer>
    </>
  );
}
